import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorPageComponent } from './indicator-page.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { AssessmentRoutingModule } from '@modules/assessment/assessment-routing.module';
import { AssessmentService } from '@modules/assessment/services/assessment.service';
import { SharedModule } from '@shared/shared.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('IndicatorPageComponent', () => {
  let component: IndicatorPageComponent;
  let fixture: ComponentFixture<IndicatorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        AssessmentRoutingModule,
        SharedModule,
        NgxEchartsModule,
        MatNativeDateModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule
      ],
      declarations: [ IndicatorPageComponent ],
      providers: [
        AssessmentService
      ]
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
