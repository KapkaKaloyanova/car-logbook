import { Component,  input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Car } from '../../../../shared/interfaces/car';

@Component({
  selector: 'app-car-card',
  imports: [RouterLink],
  templateUrl: './car-card.component.html',
  styleUrl: './car-card.component.css',
})
export class CarCardComponent {
  car = input.required<Car>()

}
