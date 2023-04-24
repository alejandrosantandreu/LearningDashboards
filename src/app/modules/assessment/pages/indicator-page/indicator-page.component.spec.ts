import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorPageComponent } from './indicator-page.component';

describe('IndicatorPageComponent', () => {
  let component: IndicatorPageComponent;
  let fixture: ComponentFixture<IndicatorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndicatorPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndicatorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
