import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricPageComponent } from './metric-page.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { AssessmentRoutingModule } from '@modules/assessment/assessment-routing.module';
import { SharedModule } from '@shared/shared.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { MaterialModule } from 'src/material.module';
import { AssessmentService } from '@modules/assessment/services/assessment.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('MetricPageComponent', () => {
  let component: MetricPageComponent;
  let fixture: ComponentFixture<MetricPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        AssessmentRoutingModule,
        SharedModule,
        NgxEchartsModule,
        MatNativeDateModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        HttpClientModule,
        RouterTestingModule
      ],
      declarations: [ MetricPageComponent ],
      providers: [
        AssessmentService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetricPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
