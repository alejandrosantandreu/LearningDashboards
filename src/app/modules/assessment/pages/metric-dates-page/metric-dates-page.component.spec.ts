import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricDatesPageComponent } from './metric-dates-page.component';

describe('MetricDatesPageComponent', () => {
  let component: MetricDatesPageComponent;
  let fixture: ComponentFixture<MetricDatesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetricDatesPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetricDatesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
