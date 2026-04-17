import { inject, Injectable } from '@angular/core';
import { ServiceRecordService } from './service-record.service';
import { forkJoin, map, Observable } from 'rxjs';
import { DocumentRecordService } from './document-record.service';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private serviceRecordService = inject(ServiceRecordService);
  private documentRecordService = inject(DocumentRecordService);

  getAlertsForCar(carId: string): Observable<string[]> {

    return forkJoin([
      this.serviceRecordService.getServiceRecordsById(carId),
      this.documentRecordService.getDocumentRecordsById(carId)
    ]).pipe(
      map(([serviceRecs, docRecs]) => {
        const today = new Date();
        const soon = new Date();
        soon.setDate(today.getDate() + 14); // Add 14 days to the current date
        const result: string[] = [];

        //Проверка на документи
        docRecs.forEach(doc => {
          if (doc.expiryDate) {
            const expiry = new Date(doc.expiryDate);
            if (expiry < today) {
              result.push(`⚠️ Документ "${doc.title}" е с изтекъл срок!`);
            } else if (expiry <= soon) {
              result.push(`🔔 Документ "${doc.title}" изтича на ${doc.expiryDate }!`);
            }
          }
        });
        //Проверка на сервизи
        serviceRecs.forEach(rec => {
          if (rec.nextServiceDate) {
            const nextService = new Date(rec.nextServiceDate);
            if (nextService < today) {
              result.push(`⚠️ Сервиз "${rec.type}" е изтекъл!`);
            } else if (nextService <= soon) {
              result.push(`🔔 Сервиз "${rec.type}" изтича на ${rec.nextServiceDate}!`);
            }
          }
        });

        return result;
      })
    )

  }




}
