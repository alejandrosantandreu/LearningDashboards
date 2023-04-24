import { Component, OnInit } from '@angular/core';
import { AssessmentService } from '@modules/assessment/services/assessment.service';
import { HttpClient } from '@angular/common/http';
import { IndicatorModel } from '@core/indicator.model';

@Component({
  selector: 'app-indicator-page',
  templateUrl: './indicator-page.component.html',
  styleUrls: ['./indicator-page.component.css']
})
export class IndicatorPageComponent implements OnInit {

  menuOptions: Array<any> = []

  indicators1: Array<IndicatorModel> = []
  indicators2: Array<IndicatorModel> = []
  indicators3: Array<IndicatorModel> = []
  indicators4: Array<IndicatorModel> = []
  indicators: Array<IndicatorModel> = []

  datos: any
  dataNames: Array<any> = []
  dataValues: Array<any> = []
  d: any

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
  opt: any;

  showDetails: boolean = false

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
    this.assessmentservice.getAllIndicators$('pes11a').subscribe( 
      result => {
          this.indicators1 = result; 
      }
    );
    this.assessmentservice.getAllIndicators$('pes12a').subscribe( 
      result => {
          this.indicators2 = result; 
      }
    );
    this.assessmentservice.getAllIndicators$('pes21a').subscribe( 
      result => {
          this.indicators3 = result; 
      }
    );
    this.assessmentservice.getAllIndicators$('pes22a').subscribe( 
      result => {
          this.indicators4 = result; 
      }
    );
  }

  selectGroup(g: string): void {
    this.actualGroup = g;
    this.options = []
    if(this.actualGroup == 'pes11a') {
      this.indicators = this.indicators1
    }
    else if(this.actualGroup == 'pes12a') {
      this.indicators = this.indicators2
    }
    else if(this.actualGroup == 'pes21a') {
      this.indicators = this.indicators3
    }
    else if(this.actualGroup == 'pes22a') {
      this.indicators = this.indicators4  
    }

    this.description()

    for(let j=0; j < this.title.length; j++){
      this.takeData(j)
      this.takeDetails(j)
      this.generateGraphics(j)
    }
  }

  description(): void {
    this.title = []
    for(let i=0; i < this.indicators.length; i++){
      this.present = false
      for(let j=0; j < this.title.length; j++){
        if (this.indicators[i].name == this.title[j]) {
          this.present = true
        }
      }
      if(!this.present) {
        this.title.push(this.indicators[i].name)
      }
    }
  }

  takeDetails(j: number): void {
    let text = this.indicators[j].rationale
    const a = text.indexOf("{");
    const b = text.indexOf("}");
    const chars = text.substring(a + 2, b);
    const names = chars.split(";");
    this.d = {
      desc: this.indicators[j].value_description,
      fecha: this.indicators[j].date,
      prop: names
    }
  }

  takeData(j: number): void {
    this.datos = []
    this.dataNames = []
    this.dataValues = []
    for(let i=0; i < this.indicators.length; i++){
      if (this.indicators[i].name == this.title[j]) {
        this.datos.push({ value: this.indicators[i].value.first, name: this.indicators[i].name })
        this.dataNames.push(this.indicators[i].name)
        this.dataValues.push(this.indicators[i].value.first)
        this.total = this.total - this.indicators[i].value.first
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
      this.opt = {
        graph: this.option0,
        det: this.d
      }
      this.options.push(this.opt)
    }
    else if(this.type == 'Bar') {
      this.option0 = {
        title: {
          text: this.title[j],
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
      this.opt = {
        graph: this.option0,
        det: this.d
      }
      this.options.push(this.opt)
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

  show(): void {
    this.showDetails = !this.showDetails
  }
}
