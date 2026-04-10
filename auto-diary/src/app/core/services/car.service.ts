import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../../shared/interfaces/car';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private httpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:3030/data/cars';

  getAllCars(): Observable<Car[]> {
    return this.httpClient.get<Car[]>(this.apiUrl);
  };

  getCarById(carId: string): Observable<Car> {
    return this.httpClient.get<Car>(`${this.apiUrl}/${carId}`);
  };

  createCar(carData: Partial<Car>): Observable<Car> {
    return this.httpClient.post<Car>(this.apiUrl, carData);
  };

  updateCar(carId: string, carData: Partial<Car>): Observable<Car> {
    return this.httpClient.put<Car>(`${this.apiUrl}/${carId}`, carData);
  };

  deleteCar(carId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${carId}`);
  };

  getCarsByOwner(ownerId: string): Observable<Car[]> {
    return this.httpClient.get<Car[]>(`${ this.apiUrl }?where=_ownerId%3D%22${ownerId}%22`);
  };

}
