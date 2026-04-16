export interface DocumentRecord {
    _id: string;
    carId: string;
    price: number;
    type: 'insurance' | 'civil_liability' | 'tax' | 'vignette' | 'other';
    date: string;
    brand?: string;
    expiryDate?: string;
    comment?: string;
}