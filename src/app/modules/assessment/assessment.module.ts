import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { AssessmentRoutingModule } from './assessment-routing.module';
import { IndicatorPageComponent } from './pages/indicator-page/indicator-page.component';
import { FactorPageComponent } from './pages/factor-page/factor-page.component';
import { MetricPageComponent } from './pages/metric-page/metric-page.component';
import { SharedModule } from '@shared/shared.module';
import { AssessmentPageComponent } from './pages/assessment-page/assessment-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssessmentService } from '@modules/assessment/services/assessment.service';
import { HttpClientModule } from '@angular/common/http';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { AccordionModule } from 'primeng/accordion';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    IndicatorPageComponent,
    FactorPageComponent,
    MetricPageComponent,
    AssessmentPageComponent,
  ],
  imports: [
    CommonModule,
    AssessmentRoutingModule,
    SharedModule,
    NgxEchartsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CalendarModule,
    ButtonModule,
    MultiSelectModule,
    AccordionModule,
    RadioButtonModule,
    ProgressBarModule,
    ToastModule
  ],
  providers: [AssessmentService],
  bootstrap: [MetricPageComponent]
})
export class AssessmentModule { }
