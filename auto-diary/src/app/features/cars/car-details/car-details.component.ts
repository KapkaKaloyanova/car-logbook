import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CarService } from '../../../core/services/car.service';
import { Car } from '../../../shared/interfaces/car';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-car-details',
  imports: [RouterLink],
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.css',
})
export class CarDetailsComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private carService = inject(CarService);
  private authService = inject(AuthService);
  private router = inject(Router);

  currentCar = signal<Car | null>(null);

  isOwner = computed(() => {
    return this.currentCar()?._ownerId === this.authService.currentUser()?._id
  })

  ngOnInit(): void {

    const carId = this.activatedRoute.snapshot.params['id'];

    if (carId) {
      this.carService.getCarById(carId)
        .subscribe({
          next: car => this.currentCar.set(car)
        });
    }
  }

  onDelete(carId: string) {
    this.carService.deleteCar(carId).subscribe({
      next: () => {
        this.currentCar.set(null);
        this.router.navigate(['/cars']);
      }
    });
  }
}
