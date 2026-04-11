import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarFuelComponent } from './car-fuel.component';

describe('CarFuelComponent', () => {
  let component: CarFuelComponent;
  let fixture: ComponentFixture<CarFuelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarFuelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarFuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
