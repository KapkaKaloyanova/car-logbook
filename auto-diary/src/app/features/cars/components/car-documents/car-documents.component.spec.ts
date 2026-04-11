import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDocumentsComponent } from './car-documents.component';

describe('CarDocumentsComponent', () => {
  let component: CarDocumentsComponent;
  let fixture: ComponentFixture<CarDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarDocumentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
