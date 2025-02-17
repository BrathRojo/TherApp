import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonaadminComponent } from './zonaadmin.component';

describe('ZonaadminComponent', () => {
  let component: ZonaadminComponent;
  let fixture: ComponentFixture<ZonaadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ZonaadminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZonaadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
