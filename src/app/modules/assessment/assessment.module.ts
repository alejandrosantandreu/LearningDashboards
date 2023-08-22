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
    HttpClientModule
  ],
  providers: [AssessmentService],
  bootstrap: [MetricPageComponent]
})
export class AssessmentModule { }
