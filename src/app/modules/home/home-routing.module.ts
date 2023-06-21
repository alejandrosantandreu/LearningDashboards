import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'assessment',
    loadChildren: () => import('@modules/assessment/assessment.module').then(m => m.AssessmentModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('@modules/setting/setting.module').then(m => m.SettingModule)
  },
  {
    path: 'home',
    loadChildren: () => import('@modules/principal/principal.module').then(m => m.PrincipalModule)
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
