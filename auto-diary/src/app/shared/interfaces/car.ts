export interface Car {
    _id: string;
    brand: string;
    model: string;
    year: number;
    engineType: string;
    initialMileage: number;
    fuelType: 'benzin' | 'diesel' | 'hybrid' | 'electric' | 'gas';
    imageUrl?: string;
    _ownerId: string;
    _createdOn?: string;
}
