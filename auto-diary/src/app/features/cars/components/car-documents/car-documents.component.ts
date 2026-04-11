import { Component, input } from '@angular/core';
import { Car } from '../../../../shared/interfaces/car';

@Component({
  selector: 'app-car-documents',
  imports: [],
  templateUrl: './car-documents.component.html',
  styleUrl: './car-documents.component.css',
})
export class CarDocumentsComponent {
    car = input.required<Car>();


}
