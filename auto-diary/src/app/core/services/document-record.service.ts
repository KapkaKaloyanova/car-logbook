import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentRecord } from '../../shared/interfaces/document-record';

@Injectable({
  providedIn: 'root',
})
export class DocumentRecordService {
  private httpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:3030/data/documents';


  createDocumentRecord(documentData: Partial<DocumentRecord>): Observable<DocumentRecord> {
    return this.httpClient.post<DocumentRecord>(this.apiUrl, documentData);
  }


  getDocumentRecordsById(carId: string): Observable<DocumentRecord[]> {
    return this.httpClient.get<DocumentRecord[]>(`${this.apiUrl}?where=carId%3D%22${carId}%22`);
  }

  getDocumentRecordById(docRecId: string): Observable<DocumentRecord> {
    return this.httpClient.get<DocumentRecord>(`${this.apiUrl}/${docRecId}`);
  }

  deleteDocumentRecord(docRecId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${docRecId}`);
  }

  editDocumentRecord(docRecId: string, documentData: Partial<DocumentRecord>): Observable<DocumentRecord> {
    return this.httpClient.put<DocumentRecord>(`${this.apiUrl}/${docRecId}`, documentData);
  }
}
