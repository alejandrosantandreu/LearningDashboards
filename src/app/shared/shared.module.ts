import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { HeaderUserComponent } from './components/header-user/header-user.component';
import { GenericGraphicComponent } from './components/generic-graphic/generic-graphic.component';
import { HomeOptionComponent } from './components/home-option/home-option.component';
import { BackMenuComponent } from './components/back-menu/back-menu.component';
import { RouterModule } from '@angular/router';
import { GraphicTypeComponent } from './components/graphic-type/graphic-type.component';
import { GroupSelectorComponent } from './components/group-selector/group-selector.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SideBarComponent,
    HeaderUserComponent,
    GenericGraphicComponent,
    HomeOptionComponent,
    BackMenuComponent,
    GraphicTypeComponent,
    GroupSelectorComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    SideBarComponent,
    HeaderUserComponent,
    GenericGraphicComponent,
    HomeOptionComponent,
    BackMenuComponent,
    GraphicTypeComponent,
    GroupSelectorComponent
  ]
})
export class SharedModule { }
