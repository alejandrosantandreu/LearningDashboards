import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QualityPageComponent } from './pages/quality-page/quality-page.component';

const routes: Routes = [
  {
    path: '',
    component: QualityPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QualityRequirementRoutingModule { }
