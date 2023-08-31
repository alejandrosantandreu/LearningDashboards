import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorDatesPageComponent } from './indicator-dates-page.component';

describe('IndicatorDatesPageComponent', () => {
  let component: IndicatorDatesPageComponent;
  let fixture: ComponentFixture<IndicatorDatesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndicatorDatesPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndicatorDatesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
