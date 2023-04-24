import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimulationRoutingModule } from './simulation-routing.module';
import { FactorPageComponent } from './pages/factor-page/factor-page.component';
import { MetricPageComponent } from './pages/metric-page/metric-page.component';
import { ModelPageComponent } from './pages/model-page/model-page.component';
import { SimulationPageComponent } from './pages/simulation-page/simulation-page.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    FactorPageComponent,
    MetricPageComponent,
    ModelPageComponent,
    SimulationPageComponent
  ],
  imports: [
    CommonModule,
    SimulationRoutingModule,
    SharedModule
  ]
})
export class SimulationModule { }
