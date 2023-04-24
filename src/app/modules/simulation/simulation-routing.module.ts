import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FactorPageComponent } from './pages/factor-page/factor-page.component';
import { MetricPageComponent } from './pages/metric-page/metric-page.component';
import { ModelPageComponent } from './pages/model-page/model-page.component';
import { SimulationPageComponent } from './pages/simulation-page/simulation-page.component';


const routes: Routes = [
  {
    path: 'factor',
    component: FactorPageComponent
  },
  {
    path: 'metric',
    component: MetricPageComponent
  },
  {
    path: 'model',
    component: ModelPageComponent
  },
  {
    path: '',
    component: SimulationPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimulationRoutingModule { }
