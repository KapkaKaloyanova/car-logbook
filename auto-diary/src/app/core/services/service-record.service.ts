import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ServiceRecord } from '../../shared/interfaces/service-record';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceRecordService {
  private httpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:3030/data/service-records';

  createServiceRecord(serviceData: Partial<ServiceRecord>): Observable<ServiceRecord> {
    return this.httpClient.post<ServiceRecord>(this.apiUrl, serviceData);
   }

  getServiceRecordsById(carId:string): Observable<ServiceRecord[]> { 
    return this.httpClient.get<ServiceRecord[]>(`${this.apiUrl}?where=carId%3D%22${carId}%22`);
  }

  getServiceRecordById(serviceId: string): Observable<ServiceRecord> { 
    return this.httpClient.get<ServiceRecord>(`${this.apiUrl}/${serviceId}`);
  }

  deleteServiceRecord(serviceId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${serviceId}`)
   }

  editServiceRecord(serviceId: string, serviceRecordData: Partial<ServiceRecord>): Observable<ServiceRecord> {
    return this.httpClient.put<ServiceRecord>(`${this.apiUrl}/${serviceId}`, serviceRecordData)
   }



}
