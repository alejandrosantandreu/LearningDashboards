import { Component, OnInit } from '@angular/core';
import { AssessmentService } from '@modules/assessment/services/assessment.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MetricModel } from '@core/metrics.model';

@Component({
  selector: 'app-metric-page',
  templateUrl: './metric-page.component.html',
  styleUrls: ['./metric-page.component.css']
})
export class MetricPageComponent implements OnInit {

  model:any;
  metrics: Array<MetricModel> = []
  menuOptions: Array<any> = []

  constructor(private assessmentservice: AssessmentService, private http: HttpClient) { }

  ngOnInit(): void {
    this.loadDataAll()

    this.menuOptions = [
      {
        name: 'Star',
      },
      {
        name: 'Bar',
      }
    ]
  }

  loadDataAll(): void {
    this.model.getAllMetrics$().subscribe((data: any) => {console.log(this.metrics, this.metrics = data)})
  }

}
