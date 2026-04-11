import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../../../core/services/car.service';
import { AuthService } from '../../../core/services/auth.service';
import { Car } from '../../../shared/interfaces/car';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-car-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './car-edit.component.html',
  styleUrl: './car-edit.component.css',
})
export class CarEditComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private carService = inject(CarService);
  private router = inject(Router);
  private authService = inject(AuthService);

  currentCar = signal<Car | null>(null);
  isOwner = computed(() => this.currentCar()?._ownerId === this.authService.currentUser()?._id);

  private carId = this.activatedRoute.snapshot.params['id'];

  editForm = new FormGroup({
    brand: new FormControl('', [Validators.required]),
    model: new FormControl('', [Validators.required]),
    year: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1950),
      Validators.max(new Date().getFullYear() + 1)
    ]),
    engineType: new FormControl('', [Validators.required]),
    initialMileage: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    fuelType: new FormControl('', [Validators.required]),
    imageUrl: new FormControl(''),
  })
  ngOnInit(): void {
    this.carService.getCarById(this.carId)
      .subscribe({
        next: car => {
          this.currentCar.set(car);
          this.editForm.patchValue({
            brand: car.brand,
            model: car.model,
            year: car.year,
            engineType: car.engineType,
            initialMileage: car.initialMileage,
            fuelType: car.fuelType,
            imageUrl: car.imageUrl,
          });
        }
      });
  }

  onSubmit() {
    if (this.editForm.invalid) {
      return;
    }
    const carData = this.editForm.value as Partial<Car>;

    this.carService.updateCar(this.carId, carData).subscribe({
      next: () => {
        this.router.navigate(['/cars', this.carId]);
      },
      error: (err) => {
        console.error('Грешка при редактиране:', err);
      }
    })
  }

}
