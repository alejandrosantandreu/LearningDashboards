import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingPageComponent } from './pages/setting-page/setting-page.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    SettingPageComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    SharedModule
  ]
})
export class SettingModule { }
