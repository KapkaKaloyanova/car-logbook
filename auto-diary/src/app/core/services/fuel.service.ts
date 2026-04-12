import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FuelRecord } from '../../shared/interfaces/fuel-record';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FuelService {
  private httpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:3030/data/fuel';

  createFuelRecord(fuelData: Partial<FuelRecord>): Observable<FuelRecord> {
    return this.httpClient.post<FuelRecord>(this.apiUrl, fuelData);
  }
}
