import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { PrincipalRoutingModule } from './principal-routing.module';
import { PrincipalPageComponent } from './pages/principal-page/principal-page.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    PrincipalPageComponent
  ],
  imports: [
    CommonModule,
    PrincipalRoutingModule,
    SharedModule,
    NgxEchartsModule
  ]
})
export class PrincipalModule { }
