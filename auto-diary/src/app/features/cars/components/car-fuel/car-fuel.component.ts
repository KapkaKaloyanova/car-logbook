import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Car } from '../../../../shared/interfaces/car';
import { FuelService } from '../../../../core/services/fuel.service';
import { FuelRecord } from '../../../../shared/interfaces/fuel-record';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { BgDateDirective } from '../../../../shared/directives/bg-date.directive';

@Component({
  selector: 'app-car-fuel',
  imports: [RouterLink, DecimalPipe, BgDateDirective],
  templateUrl: './car-fuel.component.html',
  styleUrl: './car-fuel.component.css',
})
export class CarFuelComponent implements OnInit {
  private fuelService = inject(FuelService);

  car = input.required<Car>();
  fuelRecords = signal<FuelRecord[]>([]);

  ngOnInit() {

    this.fuelService.getFuelRecordsById(this.car()._id)
      .subscribe({
        next: fuelRec => this.fuelRecords.set(fuelRec),
        error: (err) => {
          console.error('Грешка при получаване на записите:', err);
        }
      })
  }

  onDelete(fuelId: string) {
    if (confirm('Сигурни ли сте, че искате да изтриете този запис?')) {
      this.fuelService.deleteFuelRecord(fuelId).subscribe(
        {
          next: () => {
            this.fuelRecords.update(rec => rec.filter(r => r._id !== fuelId));
          }
        }
      );
    }
  }
}

