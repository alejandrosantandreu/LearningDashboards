import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QualityRequirementRoutingModule } from './quality-requirement-routing.module';
import { QualityPageComponent } from './pages/quality-page/quality-page.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    QualityPageComponent
  ],
  imports: [
    CommonModule,
    QualityRequirementRoutingModule,
    SharedModule
  ]
})
export class QualityRequirementModule { }
