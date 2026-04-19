import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Car } from '../../../../shared/interfaces/car';
import { ServiceRecordService } from '../../../../core/services/service-record.service';
import { RouterLink } from '@angular/router';
import { ServiceRecord } from '../../../../shared/interfaces/service-record';
import { DecimalPipe } from '@angular/common';
import { ExpiryWarningDirective } from '../../../../shared/directives/expiry-warning.directive';

@Component({
  selector: 'app-car-service',
  imports: [RouterLink , DecimalPipe, ExpiryWarningDirective],
  templateUrl: './car-service.component.html',
  styleUrl: './car-service.component.css',
})
export class CarServiceComponent implements OnInit {
  private serviceRecordService = inject(ServiceRecordService);
  car = input.required<Car>();
  serviceRecords = signal<ServiceRecord[]>([]);

  ngOnInit(): void {
    this.serviceRecordService.getServiceRecordsById(this.car()._id).subscribe({
      next: (serviceRecord) => {
        this.serviceRecords.set(serviceRecord);
      },
      error: (err) => {
        console.error('Грешка при получаване на записите:', err);
      }
    });
  }

  onDelete(serviceRecordId: string) {
    if (confirm('Сигурни ли сте, че искате да изтриете този запис?')) {
      this.serviceRecordService.deleteServiceRecord(serviceRecordId).subscribe({
        next: () => {
          this.serviceRecords.update(rec => rec.filter(r => r._id !== serviceRecordId));
        },
        error: (err) => {
          console.error('Грешка при изтриване на запис:', err);
        }
      });
    }
  }
}
