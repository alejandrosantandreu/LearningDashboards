import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactorPageComponent } from './factor-page.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { AssessmentRoutingModule } from '@modules/assessment/assessment-routing.module';
import { AssessmentService } from '@modules/assessment/services/assessment.service';
import { SharedModule } from '@shared/shared.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { MaterialModule } from 'src/material.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('FactorPageComponent', () => {
  let component: FactorPageComponent;
  let fixture: ComponentFixture<FactorPageComponent>;

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
      declarations: [ FactorPageComponent ],
      providers: [
        AssessmentService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
