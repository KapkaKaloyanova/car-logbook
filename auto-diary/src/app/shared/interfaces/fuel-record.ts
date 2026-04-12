export interface FuelRecord {
    _id: string;
    date: string;
    mileage: number;
    liters: number;
    unitPrice: number;
    price: number;
    carId: string;
    roadType: 'city' | 'highway' | 'offroad' ;
    gasStation: string;
    gasStationAddress: string;
}
