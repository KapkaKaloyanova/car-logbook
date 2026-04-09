import { Component, inject, OnInit, signal } from '@angular/core';
import { CarService } from '../../../core/services/car.service';
import { RouterLink } from '@angular/router';
import { Car } from '../../../shared/interfaces/car';
import { CarCardComponent } from "../components/car-card/car-card.component";

@Component({
  selector: 'app-car-catalog',
  imports: [RouterLink, CarCardComponent],
  templateUrl: './car-catalog.component.html',
  styleUrl: './car-catalog.component.css',
})
export class CarCatalogComponent implements OnInit {
  private carService = inject(CarService);

  carsList = signal<Car[]>([]);
  isLoading = signal(true);

  ngOnInit(): void {
    this.carService.getAllCars().subscribe({
      next: (cars) => {
        this.carsList.set(cars);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    })
  }

}
