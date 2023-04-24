import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertPageComponent } from './pages/alert-page/alert-page.component';

const routes: Routes = [
  {
    path: '',
    component: AlertPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlertRoutingModule { }
