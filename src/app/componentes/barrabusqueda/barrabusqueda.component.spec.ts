import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarrabusquedaComponent } from './barrabusqueda.component';

describe('BarrabusquedaComponent', () => {
  let component: BarrabusquedaComponent;
  let fixture: ComponentFixture<BarrabusquedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BarrabusquedaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarrabusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
