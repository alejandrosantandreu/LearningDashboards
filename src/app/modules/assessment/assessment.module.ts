import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { AssessmentRoutingModule } from './assessment-routing.module';
import { IndicatorPageComponent } from './pages/indicator-page/indicator-page.component';
import { FactorPageComponent } from './pages/factor-page/factor-page.component';
import { MetricPageComponent } from './pages/metric-page/metric-page.component';
import { SharedModule } from '@shared/shared.module';
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
import { MetricDatesPageComponent } from './pages/metric-dates-page/metric-dates-page.component';
import { FactorDatesPageComponent } from './pages/factor-dates-page/factor-dates-page.component';
import { IndicatorDatesPageComponent } from './pages/indicator-dates-page/indicator-dates-page.component';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [
    IndicatorPageComponent,
    FactorPageComponent,
    MetricPageComponent,
    MetricDatesPageComponent,
    FactorDatesPageComponent,
    IndicatorDatesPageComponent,
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
    ToastModule,
    DropdownModule
  ],
  providers: [AssessmentService],
  bootstrap: [MetricPageComponent]
})
export class AssessmentModule { }
