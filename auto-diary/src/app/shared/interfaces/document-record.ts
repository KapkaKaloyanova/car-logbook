export interface DocumentRecord {
    _id: string;
    carId: string;
    type: 'insurance' | 'civil_liability' | 'tax' | 'vignette' | 'other';
    title: string;
    date: string;
    price: number;
    brand?: string;
    expiryDate?: string;
    comment?: string;
}