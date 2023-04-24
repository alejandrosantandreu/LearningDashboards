import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorDetailedPageComponent } from './indicator-detailed-page.component';

describe('IndicatorDetailedPageComponent', () => {
  let component: IndicatorDetailedPageComponent;
  let fixture: ComponentFixture<IndicatorDetailedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndicatorDetailedPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndicatorDetailedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
