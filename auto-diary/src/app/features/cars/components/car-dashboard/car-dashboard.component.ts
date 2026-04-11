import { Component, input } from '@angular/core';
import { Car } from '../../../../shared/interfaces/car';

@Component({
  selector: 'app-car-dashboard',
  imports: [],
  templateUrl: './car-dashboard.component.html',
  styleUrl: './car-dashboard.component.css',
})
export class CarDashboardComponent {
  car = input.required<Car>();

  
}
