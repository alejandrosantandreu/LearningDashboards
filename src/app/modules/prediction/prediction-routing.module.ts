import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndicatorPageComponent } from './pages/indicator-page/indicator-page.component';
import { IndicatorDetailedPageComponent } from './pages/indicator-detailed-page/indicator-detailed-page.component';
import { FactorPageComponent } from './pages/factor-page/factor-page.component';
import { FactorDetailedPageComponent } from './pages/factor-detailed-page/factor-detailed-page.component';
import { MetricPageComponent } from './pages/metric-page/metric-page.component';
import { PredictionPageComponent } from './pages/prediction-page/prediction-page.component';


const routes: Routes = [
  {
    path: 'indicator',
    component: IndicatorPageComponent
  },
  {
    path: 'indicator/detailed',
    component: IndicatorDetailedPageComponent
  },
  {
    path: 'factor',
    component: FactorPageComponent
  },
  {
    path: 'factor/detailed',
    component: FactorDetailedPageComponent
  },
  {
    path: 'metric',
    component: MetricPageComponent
  },
  {
    path: '',
    component: PredictionPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PredictionRoutingModule { }
