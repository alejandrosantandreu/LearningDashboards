import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertRoutingModule } from './alert-routing.module';
import { AlertPageComponent } from './pages/alert-page/alert-page.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    AlertPageComponent
  ],
  imports: [
    CommonModule,
    AlertRoutingModule,
    SharedModule
  ]
})
export class AlertModule { }
