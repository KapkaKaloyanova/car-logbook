import { Car } from "../interfaces/car";

export function checkForDuplicate(cars: Car[], formValue: Partial<Car>): boolean {
    return cars.some(car => 
        car.brand === formValue.brand && 
        car.model === formValue.model &&
        car.year === formValue.year
    );
}