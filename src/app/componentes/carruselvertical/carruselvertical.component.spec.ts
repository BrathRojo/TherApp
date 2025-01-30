import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarruselverticalComponent } from './carruselvertical.component';

describe('CarruselverticalComponent', () => {
  let component: CarruselverticalComponent;
  let fixture: ComponentFixture<CarruselverticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarruselverticalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarruselverticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
