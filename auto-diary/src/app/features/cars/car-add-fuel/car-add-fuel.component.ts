import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FuelService } from '../../../core/services/fuel.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FuelRecord } from '../../../shared/interfaces/fuel-record';
import { DecimalPipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-car-add-fuel',
  imports: [ReactiveFormsModule, DecimalPipe],
  templateUrl: './car-add-fuel.component.html',
  styleUrl: './car-add-fuel.component.css',
})
export class CarAddFuelComponent implements OnInit, OnDestroy {
  private fuelService = inject(FuelService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  carId = this.route.snapshot.params['id'];
  unitPrice = signal<number | null>(null);
  private subscription!: Subscription;

  fuelRecordForm = new FormGroup({
    date: new FormControl<string>('', [Validators.required]),
    mileage: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    liters: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    unitPrice: new FormControl<number | null>(null, [Validators.min(0)]),
    price: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    roadType: new FormControl<FuelRecord['roadType']>('city'),
    gasStation: new FormControl<string>(''),
    gasStationAddress: new FormControl<string>(''),
  });

  ngOnInit(): void {
    this.subscription = this.fuelRecordForm.valueChanges.subscribe(val => {
      if (!val.unitPrice && val.price && val.liters) {
        this.unitPrice.set(Math.round((val.price / val.liters) * 100) / 100);
      }
    });
  }

  errorMessage = '';

  onSubmit() {
    if (this.fuelRecordForm.invalid) {
      return;
    }
    const fuelData = {
      ...this.fuelRecordForm.value,
      carId: this.carId
    } as Partial<FuelRecord>

    if (!fuelData.unitPrice && this.unitPrice()) {
      fuelData.unitPrice = (this.unitPrice()!);
    }

    this.fuelService.createFuelRecord(fuelData).subscribe({
      next: () => { this.router.navigate(['/cars', this.carId]) },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Unexpected error occured';
      }
    })
  }

  onReset() {
    this.fuelRecordForm.reset({ roadType: 'city' });
    this.unitPrice.set(null);
  }

  onCancel() {
    this.router.navigate(['/cars', this.carId]);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
