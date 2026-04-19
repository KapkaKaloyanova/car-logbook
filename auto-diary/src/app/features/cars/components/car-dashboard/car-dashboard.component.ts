import { Component, computed, ElementRef, inject, input, OnInit, signal, ViewChild } from '@angular/core';
import { Car } from '../../../../shared/interfaces/car';
import { FuelService } from '../../../../core/services/fuel.service';
import { ServiceRecordService } from '../../../../core/services/service-record.service';
import { DocumentRecordService } from '../../../../core/services/document-record.service';
import { FuelRecord } from '../../../../shared/interfaces/fuel-record';
import { ServiceRecord } from '../../../../shared/interfaces/service-record';
import { DocumentRecord } from '../../../../shared/interfaces/document-record';
import { AlertService } from '../../../../core/services/alert.service';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Alert } from '../../../../shared/interfaces/alert';
import { Chart } from 'chart.js/auto';
import { createFuelChart } from '../../../../shared/helpers/chart-helpers';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { BgDateDirective } from '../../../../shared/directives/bg-date.directive';
import { ExpiryWarningDirective } from '../../../../shared/directives/expiry-warning.directive';

Chart.register(ChartDataLabels);

@Component({
  selector: 'app-car-dashboard',
  imports: [RouterLink, DatePipe, BgDateDirective, ExpiryWarningDirective],
  templateUrl: './car-dashboard.component.html',
  styleUrl: './car-dashboard.component.css',
})
export class CarDashboardComponent implements OnInit {
  @ViewChild('fuelChart') chartCanvas!: ElementRef<HTMLCanvasElement>;


  private fuelService = inject(FuelService);
  private serviceRecordService = inject(ServiceRecordService);
  private documentRecordService = inject(DocumentRecordService);
  private alertService = inject(AlertService);
  private chart: Chart | null = null;

  car = input.required<Car>();

  fuelRecords = signal<FuelRecord[]>([]);
  recentFuelRecords = computed(() => this.fuelRecords().slice(-5));
  serviceRecords = signal<ServiceRecord[]>([]);
  recentServiceRecords = computed(() => this.serviceRecords().slice(-5));
  documentRecords = signal<DocumentRecord[]>([]);
  recentDocumentRecords = computed(() => this.documentRecords().slice(-5));

  sortedFuelRecords = computed(() =>
    [...this.fuelRecords()].sort((a, b) => a.mileage - b.mileage)
  );

  alerts = signal<Alert[]>([]);
  ngOnInit() {
    this.fuelService.getFuelRecordsById(this.car()._id)
      .subscribe({
        next: fuelRec => {
          this.fuelRecords.set(fuelRec);
          setTimeout(() => this.createChart(), 0);
        },
        error: (err) => {
          console.error('Грешка при получаване на записите:', err);
        }
      })
    this.serviceRecordService.getServiceRecordsById(this.car()._id)
      .subscribe({
        next: servRec => this.serviceRecords.set(servRec),
        error: (err) => {
          console.error('Грешка при получаване на записите:', err);
        }
      })
    this.documentRecordService.getDocumentRecordsById(this.car()._id)
      .subscribe({
        next: docRec => this.documentRecords.set(docRec),
        error: (err) => {
          console.error('Грешка при получаване на записите:', err);
        }
      })

    this.alertService.getAlertsForCar(this.car()._id).subscribe({
      next: alerts => this.alerts.set(alerts),
      error: (err) => console.error('Грешка при получаване на известията:', err)
    }
    );
  }

  dismissAlert(message: string) {
    this.alertService.dismissAlert(message);
    this.alerts.update(alerts => alerts.filter(a => a.message !== message));
  };

  createChart() {
    this.chart = createFuelChart(
      this.chartCanvas.nativeElement,
      this.sortedFuelRecords(),
      this.chart
    );
  }
} 
