import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndicatorPageComponent } from './pages/indicator-page/indicator-page.component';
import { IndicatorDetailedPageComponent } from './pages/indicator-detailed-page/indicator-detailed-page.component';
import { FactorPageComponent } from './pages/factor-page/factor-page.component';
import { FactorDetailedPageComponent } from './pages/factor-detailed-page/factor-detailed-page.component';
import { MetricPageComponent } from './pages/metric-page/metric-page.component';
import { DataPageComponent } from './pages/data-page/data-page.component';
import { ModelPageComponent } from './pages/model-page/model-page.component';
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
    path: 'data',
    component: DataPageComponent
  },
  {
    path: 'model',
    component: ModelPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssessmentRoutingModule { }
