import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { AssessmentRoutingModule } from './assessment-routing.module';
import { IndicatorPageComponent } from './pages/indicator-page/indicator-page.component';
import { IndicatorDetailedPageComponent } from './pages/indicator-detailed-page/indicator-detailed-page.component';
import { FactorDetailedPageComponent } from './pages/factor-detailed-page/factor-detailed-page.component';
import { FactorPageComponent } from './pages/factor-page/factor-page.component';
import { MetricPageComponent } from './pages/metric-page/metric-page.component';
import { DataPageComponent } from './pages/data-page/data-page.component';
import { ModelPageComponent } from './pages/model-page/model-page.component';
import { SharedModule } from '@shared/shared.module';
import { AssessmentPageComponent } from './pages/assessment-page/assessment-page.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from '../../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PopupComponent } from './pages/popup/popup.component';
import { AssessmentService } from '@modules/assessment/services/assessment.service';


@NgModule({
  declarations: [
    IndicatorPageComponent,
    IndicatorDetailedPageComponent,
    FactorDetailedPageComponent,
    FactorPageComponent,
    MetricPageComponent,
    DataPageComponent,
    ModelPageComponent,
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
    MatDialogModule
  ],
  providers: [AssessmentService],
  bootstrap: [MetricPageComponent]
})
export class AssessmentModule { }
