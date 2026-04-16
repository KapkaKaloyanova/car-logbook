import { Component, inject, OnInit } from '@angular/core';
import { ServiceRecordService } from '../../../core/services/service-record.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceRecord } from '../../../shared/interfaces/service-record';
import { CarService } from '../../../core/services/car.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-car-add-service',
  imports: [ReactiveFormsModule],
  templateUrl: './car-add-service.component.html',
  styleUrl: './car-add-service.component.css',
})
export class CarAddServiceComponent implements OnInit {
  private serviceRecordService = inject(ServiceRecordService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private carService = inject(CarService);
  private authService = inject(AuthService);

  carId = this.route.snapshot.params['id'];
  serviceId = this.route.snapshot.params['serviceId'];
  errorMessage = '';


  serviceRecordForm = new FormGroup({
    type: new FormControl<string>('', [Validators.required]),
    brand: new FormControl<string>('', [Validators.required]),
    mileage: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    price: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    date: new FormControl<string>('', [Validators.required]),
    nextServiceDate: new FormControl<string>(''),
    nextServiceMileage: new FormControl<number | null>(null, [Validators.min(0)]),
    comment: new FormControl<string>(''),

  });

  ngOnInit(): void {
    this.carService.getCarById(this.carId).subscribe({
      next: (car) => {
        if(car._ownerId !== this.authService.currentUser()?._id){
          this.router.navigate(['/cars', this.carId]);
        }
      }
    });
    
    if (this.serviceId) {
      this.serviceRecordService.getServiceRecordById(this.serviceId).subscribe({
        next: (record) => {
          this.serviceRecordForm.patchValue({
            type: record.type,
            brand: record.brand,
            mileage: record.mileage,
            price: record.price,
            date: record.date,
            nextServiceDate: record.nextServiceDate,
            nextServiceMileage: record.nextServiceMileage,
            comment: record.comment,
          })
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Unexpected error occured'
        }
      })
    }

  }

  onSubmit() {
    if (this.serviceRecordForm.invalid) {
      return;
    }
    const serviceRecordData = { ...this.serviceRecordForm.value, carId: this.carId } as Partial<ServiceRecord>;

    // Премахване на празните незадължителни полета
    if (!serviceRecordData.nextServiceDate) delete serviceRecordData.nextServiceDate;
    if (!serviceRecordData.nextServiceMileage) delete serviceRecordData.nextServiceMileage;
    if (!serviceRecordData.comment) delete serviceRecordData.comment;

    if (this.serviceId) {
      this.serviceRecordService.editServiceRecord(this.serviceId, serviceRecordData).subscribe({
        next: () => this.router.navigate(['/cars', this.carId]),
        error: (err) => {
          this.errorMessage = err.error?.message || 'Unexpected error occured';
        }
      })
    } else {
      this.serviceRecordService.createServiceRecord(serviceRecordData).subscribe({
        next: () => this.router.navigate(['/cars', this.carId]),
        error: (err) => {
          this.errorMessage = err.error?.message || 'Unexpected error occured';
        }
      })
    }
  }

  onReset() {
    this.serviceRecordForm.reset();
  }
  onCancel() {
    this.router.navigate(['/cars', this.carId]);
  }

}
