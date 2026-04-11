import { Component, input } from '@angular/core';
import { Car } from '../../../../shared/interfaces/car';

@Component({
  selector: 'app-car-service',
  imports: [],
  templateUrl: './car-service.component.html',
  styleUrl: './car-service.component.css',
})
export class CarServiceComponent {
    car = input.required<Car>();


}
