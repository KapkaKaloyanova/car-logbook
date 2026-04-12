import { Component, inject } from '@angular/core';
import { CarService } from '../../../core/services/car.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Car } from '../../../shared/interfaces/car';
import { checkForDuplicate } from '../../../shared/validators/car-validators';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-car-create',
  imports: [ReactiveFormsModule],
  templateUrl: './car-create.component.html',
  styleUrl: './car-create.component.css',
})
export class CarCreateComponent {
  private carService = inject(CarService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  createForm = new FormGroup({
    brand: new FormControl('', [Validators.required]),
    model: new FormControl('', [Validators.required]),
    year: new FormControl('', [
      Validators.required,
      Validators.min(1950),
      Validators.max(new Date().getFullYear() + 1)
    ]),
    engineType: new FormControl('', [Validators.required]),
    initialMileage: new FormControl('', [Validators.required, Validators.min(0)]),
    fuelType: new FormControl('', [Validators.required]),
    imageUrl: new FormControl(''),
  })

  onSubmit() {
    if (this.createForm.invalid) {
      return;
    }

    const carData = this.createForm.value as Partial<Car>;

    //Проверка за дублиращ се автомобил
    this.carService.getAllCars().subscribe({
      next: (cars) => {
        if (checkForDuplicate(cars, carData)) {
          this.notificationService.warning('Този автомобил вече съществува!');
          return;
        }
        this.carService.createCar(carData).subscribe({
          next: () => { this.router.navigate(['/cars']) },
          error: (err) => {
            console.error('Грешка при създаване:', err);
          }
        });
      },
      error: (err) => {
        console.error('Грешка при получаване на автомобилите:', err);
      }
    })
  }

  onCancel(){
    this.router.navigate(['/cars']);
  }
}