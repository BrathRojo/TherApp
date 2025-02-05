import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadersinbotonesComponent } from './headersinbotones.component';

describe('HeadersinbotonesComponent', () => {
  let component: HeadersinbotonesComponent;
  let fixture: ComponentFixture<HeadersinbotonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeadersinbotonesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadersinbotonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
