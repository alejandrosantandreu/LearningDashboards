import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { AssessmentRoutingModule } from './assessment-routing.module';
import { IndicatorPageComponent } from './pages/indicator-page/indicator-page.component';
import { FactorPageComponent } from './pages/factor-page/factor-page.component';
import { MetricPageComponent } from './pages/metric-page/metric-page.component';
import { SharedModule } from '@shared/shared.module';
import { AssessmentPageComponent } from './pages/assessment-page/assessment-page.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from '../../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopupComponent } from './pages/popup/popup.component';
import { AssessmentService } from '@modules/assessment/services/assessment.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    IndicatorPageComponent,
    FactorPageComponent,
    MetricPageComponent,
    AssessmentPageComponent,
    PopupComponent
  ],
  imports: [
    CommonModule,
    AssessmentRoutingModule,
    SharedModule,
    NgxEchartsModule,
    MatNativeDateModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [AssessmentService],
  bootstrap: [MetricPageComponent]
})
export class AssessmentModule { }
