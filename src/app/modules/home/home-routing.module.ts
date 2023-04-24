import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'assessment',
    loadChildren: () => import('@modules/assessment/assessment.module').then(m => m.AssessmentModule)
  },
  {
    path: 'prediction',
    loadChildren: () => import('@modules/prediction/prediction.module').then(m => m.PredictionModule)
  },
  {
    path: 'simulation',
    loadChildren: () => import('@modules/simulation/simulation.module').then(m => m.SimulationModule)
  },
  {
    path: 'alert',
    loadChildren: () => import('@modules/alert/alert.module').then(m => m.AlertModule)
  },
  {
    path: 'requirement',
    loadChildren: () => import('@modules/quality-requirement/quality-requirement.module').then(m => m.QualityRequirementModule)
  },
  {
    path: 'decision',
    loadChildren: () => import('@modules/decision/decision.module').then(m => m.DecisionModule)
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
