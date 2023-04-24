import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecisionRoutingModule } from './decision-routing.module';
import { DecisionPageComponent } from './pages/decision-page/decision-page.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    DecisionPageComponent
  ],
  imports: [
    CommonModule,
    DecisionRoutingModule,
    SharedModule
  ]
})
export class DecisionModule { }
