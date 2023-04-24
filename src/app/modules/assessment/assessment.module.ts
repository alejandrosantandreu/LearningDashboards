import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { AssessmentRoutingModule } from './assessment-routing.module';
import { IndicatorPageComponent } from './pages/indicator-page/indicator-page.component';
import { IndicatorDetailedPageComponent } from './pages/indicator-detailed-page/indicator-detailed-page.component';
import { FactorDetailedPageComponent } from './pages/factor-detailed-page/factor-detailed-page.component';
import { FactorPageComponent } from './pages/factor-page/factor-page.component';
import { MetricPageComponent } from './pages/metric-page/metric-page.component';
import { DataPageComponent } from './pages/data-page/data-page.component';
import { ModelPageComponent } from './pages/model-page/model-page.component';
import { SharedModule } from '@shared/shared.module';
import { AssessmentPageComponent } from './pages/assessment-page/assessment-page.component';


@NgModule({
  declarations: [
    IndicatorPageComponent,
    IndicatorDetailedPageComponent,
    FactorDetailedPageComponent,
    FactorPageComponent,
    MetricPageComponent,
    DataPageComponent,
    ModelPageComponent,
    AssessmentPageComponent
  ],
  imports: [
    CommonModule,
    AssessmentRoutingModule,
    SharedModule,
    NgxEchartsModule
  ]
})
export class AssessmentModule { }
