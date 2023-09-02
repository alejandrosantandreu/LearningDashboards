import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndicatorPageComponent } from './pages/indicator-page/indicator-page.component';
import { FactorPageComponent } from './pages/factor-page/factor-page.component';
import { MetricPageComponent } from './pages/metric-page/metric-page.component';
import { MetricDatesPageComponent } from './pages/metric-dates-page/metric-dates-page.component';
import { FactorDatesPageComponent } from './pages/factor-dates-page/factor-dates-page.component';
import { IndicatorDatesPageComponent } from './pages/indicator-dates-page/indicator-dates-page.component';


const routes: Routes = [
  {
    path: 'indicator',
    component: IndicatorPageComponent
  },
  {
    path: 'factor',
    component: FactorPageComponent
  },
  {
    path: 'metric',
    component: MetricPageComponent
  },
  {
    path: 'metric/dates',
    component: MetricDatesPageComponent
  },
  {
    path: 'factor/dates',
    component: FactorDatesPageComponent
  },
  {
    path: 'indicator/dates',
    component: IndicatorDatesPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssessmentRoutingModule { }
