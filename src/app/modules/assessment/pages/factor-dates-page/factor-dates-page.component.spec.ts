import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactorDatesPageComponent } from './factor-dates-page.component';

describe('FactorDatesPageComponent', () => {
  let component: FactorDatesPageComponent;
  let fixture: ComponentFixture<FactorDatesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactorDatesPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactorDatesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
