import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalcardComponent } from './verticalcard.component';

describe('VerticalcardComponent', () => {
  let component: VerticalcardComponent;
  let fixture: ComponentFixture<VerticalcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerticalcardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerticalcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
