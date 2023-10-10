import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorPageComponent } from './indicator-page.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssessmentRoutingModule } from '@modules/assessment/assessment-routing.module';
import { AssessmentService } from '@modules/assessment/services/assessment.service';
import { SharedModule } from '@shared/shared.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { AccordionModule } from 'primeng/accordion';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';

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
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule,
        CalendarModule,
        ButtonModule,
        MultiSelectModule,
        AccordionModule,
        RadioButtonModule,
        ProgressBarModule,
        ToastModule,
        DropdownModule
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
