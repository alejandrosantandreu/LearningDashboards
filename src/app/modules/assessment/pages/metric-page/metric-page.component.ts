import { Component, OnInit} from '@angular/core';
import { AssessmentService } from '@modules/assessment/services/assessment.service';

import { HttpClient } from '@angular/common/http';
import { MetricModel } from '@core/metrics.model';

@Component({
  selector: 'app-metric-page',
  templateUrl: './metric-page.component.html',
  styleUrls: ['./metric-page.component.css']
})
export class MetricPageComponent implements OnInit {

  menuOptions: Array<any> = []

  metrics1: Array<MetricModel> = []
  metrics2: Array<MetricModel> = []
  metrics3: Array<MetricModel> = []
  metrics4: Array<MetricModel> = []
  metrics: Array<MetricModel> = []

  datos: any
  dataNames: Array<any> = []
  dataValues: Array<any> = []

  pie: boolean = true;
  bar: boolean = false;
  type: string = '' 
  actualGroup: string =''
  qF: any
  title: Array<any> = []
  total: number = 1;
  present: Boolean = false;

  options: Array<any> = []
  option0: any;

  date: string=''

  constructor(private assessmentservice: AssessmentService, private http: HttpClient) { }

  ngOnInit(): void {
    this.menuOptions = [
      {
        name: 'Pie',
      },
      {
        name: 'Bar',
      }
    ]
    this.get()
  }

  get(): any {
    this.assessmentservice.getAllMetrics$('pes11a').subscribe( 
      result => {
          this.metrics1 = result; 
      }
    );
    const doc = document.getElementsByTagName("input");
    if(doc[0].value == null) {

    }
    this.assessmentservice.getAllMetrics$('pes12a').subscribe( 
      result => {
          this.metrics2 = result; 
      }
    );
    this.assessmentservice.getAllMetrics$('pes21a').subscribe( 
      result => {
          this.metrics3 = result; 
      }
    );
    this.assessmentservice.getAllMetrics$('pes22a').subscribe( 
      result => {
          this.metrics4 = result; 
      }
    );
  }

  selectGroup(g: string): void {
    this.actualGroup = g;
    this.options = []
    if(this.actualGroup == 'pes11a') {
      this.metrics = this.metrics1
    }
    else if(this.actualGroup == 'pes12a') {
      this.metrics = this.metrics2
    }
    else if(this.actualGroup == 'pes21a') {
      this.metrics = this.metrics3
    }
    else if(this.actualGroup == 'pes22a') {
      this.metrics = this.metrics4  
    }

    this.description()

    for(let j=0; j < this.qF.length; j++){
      this.takeData(j)
      this.generateGraphics(j)
    }
  }

  description(): void {
    this.qF = []
    for(let i=0; i < this.metrics.length; i++){
      this.present = false
      for(let j=0; j < this.qF.length; j++){
        if (this.metrics[i].description == this.qF[j]) {
          this.present = true
        }
      }
      if(!this.present) {
        this.qF.push(this.metrics[i].description)
        this.title.push(this.metrics[i].name)
      }
    }
  }

  takeData(j: number): void {
    this.datos = []
    this.dataNames = []
    this.dataValues = []
    for(let i=0; i < this.metrics.length; i++){
      if (this.metrics[i].description == this.qF[j]) {
        this.datos.push({ value: this.metrics[i].value_description, name: this.metrics[i].name })
        this.dataNames.push(this.metrics[i].name)
        this.dataValues.push(this.metrics[i].value_description)
        this.total = this.total - this.metrics[i].value_description
      }
    }
    if(this.total != 1 && this.total > 0) {
      this.datos.push({ value: this.total, name: 'Not Assigned' })
      this.dataNames.push('Not Assigned')
      this.dataValues.push(this.total)
      this.total = 1
    }
  }


  generateGraphics(j: number) {
    if(this.type == 'Pie') {
      this.option0 = {
        title: {
          text: this.title[j],
          subtext: this.qF[j],
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            type: 'pie',
            radius: '80%',
            data: this.datos,
            top: 40,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      this.options.push(this.option0)
    }
    else if(this.type == 'Bar') {
      this.option0 = {
        title: {
          text: this.title[j],
          subtext: this.qF[j],
          left: 'center',
        },
        xAxis: {
          type: 'category',
          data: this.dataNames
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: this.dataValues,
            type: 'bar'
          }
        ]
      }
      this.options.push(this.option0)
    }
  }


  selectGraph(g: string): void {
    this.type = g
    this.chooseGraph()
    this.selectGroup(this.actualGroup)
  }

  chooseGraph():void {
    if(this.type == 'Pie') {
      this.pie = true;
      this.bar = false;
    }
    else if (this.type == 'Bar') {
      this.bar = true;
      this.pie = false;
    }
  }
}

