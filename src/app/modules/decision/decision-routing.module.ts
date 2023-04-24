import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DecisionPageComponent } from './pages/decision-page/decision-page.component';

const routes: Routes = [
  {
    path: '',
    component: DecisionPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecisionRoutingModule { }
