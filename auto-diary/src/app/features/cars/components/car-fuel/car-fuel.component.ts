import { Component, input } from '@angular/core';
import { Car } from '../../../../shared/interfaces/car';

@Component({
  selector: 'app-car-fuel',
  imports: [],
  templateUrl: './car-fuel.component.html',
  styleUrl: './car-fuel.component.css',
})
export class CarFuelComponent {
    car = input.required<Car>();


}
