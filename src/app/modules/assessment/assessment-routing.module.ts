import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndicatorPageComponent } from './pages/indicator-page/indicator-page.component';
import { FactorPageComponent } from './pages/factor-page/factor-page.component';
import { MetricPageComponent } from './pages/metric-page/metric-page.component';
import { AssessmentPageComponent } from './pages/assessment-page/assessment-page.component';


const routes: Routes = [
  {
    path: '',
    component: AssessmentPageComponent
  },
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssessmentRoutingModule { }
