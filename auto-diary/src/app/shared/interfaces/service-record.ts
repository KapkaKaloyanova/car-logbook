export interface ServiceRecord {
    _id: string;
    carId: string;
    type: string;
    brand: string;
    mileage: number;
    price: number;
    date: string;
    nextServiceDate?: string;
    nextServiceMileage?: number;
}