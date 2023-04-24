import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PredictionRoutingModule } from './prediction-routing.module';
import { IndicatorPageComponent } from './pages/indicator-page/indicator-page.component';
import { IndicatorDetailedPageComponent } from './pages/indicator-detailed-page/indicator-detailed-page.component';
import { FactorDetailedPageComponent } from './pages/factor-detailed-page/factor-detailed-page.component';
import { FactorPageComponent } from './pages/factor-page/factor-page.component';
import { MetricPageComponent } from './pages/metric-page/metric-page.component';
import { PredictionPageComponent } from './pages/prediction-page/prediction-page.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    IndicatorPageComponent,
    IndicatorDetailedPageComponent,
    FactorDetailedPageComponent,
    FactorPageComponent,
    MetricPageComponent,
    PredictionPageComponent
  ],
  imports: [
    CommonModule,
    PredictionRoutingModule,
    SharedModule
  ]
})
export class PredictionModule { }
