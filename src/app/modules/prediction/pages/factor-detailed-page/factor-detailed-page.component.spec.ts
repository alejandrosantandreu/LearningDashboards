import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactorDetailedPageComponent } from './factor-detailed-page.component';

describe('FactorDetailedPageComponent', () => {
  let component: FactorDetailedPageComponent;
  let fixture: ComponentFixture<FactorDetailedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactorDetailedPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactorDetailedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
