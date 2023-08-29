import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderUserComponent } from './components/header-user/header-user.component';
import { GenericGraphicComponent } from './components/generic-graphic/generic-graphic.component';
import { HomeOptionComponent } from './components/home-option/home-option.component';
import { BackMenuComponent } from './components/back-menu/back-menu.component';
import { RouterModule } from '@angular/router';
import { GraphicTypeComponent } from './components/graphic-type/graphic-type.component';
import { GroupSelectorComponent } from './components/group-selector/group-selector.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { FooterComponent } from './components/footer/footer.component';
import { MenubarModule } from 'primeng/menubar';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [
    HeaderUserComponent,
    GenericGraphicComponent,
    HomeOptionComponent,
    BackMenuComponent,
    GraphicTypeComponent,
    GroupSelectorComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SidebarModule,
    ButtonModule,
    MenubarModule,
    MultiSelectModule,
    DropdownModule
  ],
  exports: [
    HeaderUserComponent,
    GenericGraphicComponent,
    HomeOptionComponent,
    BackMenuComponent,
    GraphicTypeComponent,
    GroupSelectorComponent,
    FooterComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class SharedModule { }
