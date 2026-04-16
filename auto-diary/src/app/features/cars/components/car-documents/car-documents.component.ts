import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Car } from '../../../../shared/interfaces/car';
import { DocumentRecordService } from '../../../../core/services/document-record.service';
import { DocumentRecord } from '../../../../shared/interfaces/document-record';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { DocumentTypePipe } from '../../../../shared/pipes/document-type.pipe';

@Component({
  selector: 'app-car-documents',
  imports: [RouterLink, DecimalPipe, DocumentTypePipe],
  templateUrl: './car-documents.component.html',
  styleUrl: './car-documents.component.css',
})
export class CarDocumentsComponent implements OnInit {
  private documentRecordService = inject(DocumentRecordService);
  car = input.required<Car>();

  documentRecords = signal<DocumentRecord[]>([]);

  ngOnInit(): void {
    this.documentRecordService.getDocumentRecordsById(this.car()._id).subscribe({
      next: (documentRecord) => {
        this.documentRecords.set(documentRecord)
      },
      error: (err) => console.error('Грешка при получаване на записите:', err)
    })
  }

  onDelete(documentRecorddId: string){
    if(confirm('Сигурни ли сте, че искате да изтриете този документ?')) {
      this.documentRecordService.deleteDocumentRecord(documentRecorddId).subscribe({
        next: () => {
          this.documentRecords.update(rec => rec.filter(r => r._id !== documentRecorddId));
        },
        error: (err) => console.error('Грешка при изтриване на запис:', err)
      })
    }
  }
}
