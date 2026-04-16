import { Component, inject, OnInit } from '@angular/core';
import { DocumentRecordService } from '../../../core/services/document-record.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { DocumentRecord } from '../../../shared/interfaces/document-record';

@Component({
  selector: 'app-car-add-document',
  imports: [ReactiveFormsModule],
  templateUrl: './car-add-document.component.html',
  styleUrl: './car-add-document.component.css',
})
export class CarAddDocumentComponent implements OnInit {
  private documentRecordService = inject(DocumentRecordService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  carId = this.route.snapshot.params['id'];
  documentId = this.route.snapshot.params['documentId'];
  errorMessage = '';

  documentRecordForm = new FormGroup({
    type: new FormControl<string>('', [Validators.required]),
    date: new FormControl<string>('', [Validators.required]),
    price: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    brand: new FormControl<string>(''),
    expiryDate: new FormControl<string>(''),
    comment: new FormControl<string>(''),
  })

  ngOnInit(): void {
    if (this.documentId) {
      this.documentRecordService.getDocumentRecordById(this.documentId)
        .subscribe({
          next: (record) => {
            this.documentRecordForm.patchValue({
              type: record.type,
              date: record.date,
              price: record.price,
              brand: record.brand,
              expiryDate: record.expiryDate,
              comment: record.comment
            });
          },
          error: (err) => {
            this.errorMessage = err.error?.message || 'Unexpected error occured'
          }
        })
    }
  }

  onSubmit() {
    if (this.documentRecordForm.invalid) return;

    const documentRecordData = { ...this.documentRecordForm.value, carId: this.carId } as Partial<DocumentRecord>;

    if (!documentRecordData.expiryDate) delete documentRecordData.expiryDate;
    if (!documentRecordData.brand) delete documentRecordData.brand;
    if (!documentRecordData.comment) delete documentRecordData.comment;

    if (this.documentId) {
      this.documentRecordService.editDocumentRecord(this.documentId, documentRecordData).subscribe({
        next: () => {
          this.router.navigate(['/cars', this.carId]);
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Unexpected error occured'
        }
      })
    } else {

      this.documentRecordService.createDocumentRecord(documentRecordData).subscribe({
        next: () => {
          this.router.navigate(['/cars', this.carId]);
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Unexpected error occured'
        }
      })
    }
  }

  onReset() {
    this.documentRecordForm.reset();
  }
  onCancel() {
    this.router.navigate(['/cars', this.carId]);
  }

}

