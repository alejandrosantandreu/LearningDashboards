import { Component, OnInit } from '@angular/core';
import { AssessmentService } from '@modules/assessment/services/assessment.service';
import { HttpClient } from '@angular/common/http';
import { QFModel } from '@core/qualityFactors.model';


@Component({
  selector: 'app-factor-page',
  templateUrl: './factor-page.component.html',
  styleUrls: ['./factor-page.component.css']
})
export class FactorPageComponent implements OnInit {
  
  menuOptions: Array<any> = []

  qf1: Array<QFModel> = []
  qf2: Array<QFModel> = []
  qf3: Array<QFModel> = []
  qf4: Array<QFModel> = []
  qf: Array<QFModel> = []

  datos: any
  dataNames: Array<any> = []
  dataValues: Array<any> = []
  d: any

  pie: boolean = true;
  bar: boolean = false;
  type: string = '' 
  actualGroup: string =''
  desc: Array<any> = []
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
    this.assessmentservice.getAllFactors$('pes11a').subscribe( 
      result => {
          this.qf1 = result; 
      }
    );
    this.assessmentservice.getAllFactors$('pes12a').subscribe( 
      result => {
          this.qf2 = result; 
      }
    );
    this.assessmentservice.getAllFactors$('pes21a').subscribe( 
      result => {
          this.qf3 = result; 
      }
    );
    this.assessmentservice.getAllFactors$('pes22a').subscribe( 
      result => {
          this.qf4 = result; 
      }
    );
  }

  selectGroup(g: string): void {
    this.actualGroup = g;
    this.options = []
    if(this.actualGroup == 'pes11a') {
      this.qf = this.qf1
    }
    else if(this.actualGroup == 'pes12a') {
      this.qf = this.qf2
    }
    else if(this.actualGroup == 'pes21a') {
      this.qf = this.qf3
    }
    else if(this.actualGroup == 'pes22a') {
      this.qf = this.qf4  
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
    this.desc = []
    for(let i=0; i < this.qf.length; i++){
      this.present = false
      for(let j=0; j < this.title.length; j++){
        if (this.qf[i].name == this.title[j]) {
          this.present = true
        }
      }
      if(!this.present) {
        this.title.push(this.qf[i].name)
        this.desc.push(this.qf[i].description)
      }
    }
  }

  takeDetails(j: number): void {
    let text = this.qf[j].rationale
    const a = text.indexOf("{");
    const b = text.indexOf("}");
    const chars = text.substring(a + 2, b);
    const names = chars.split(";");
    this.d = {
      desc: this.qf[j].value_description,
      fecha: this.qf[j].date,
      prop: names
    }
  }

  takeData(j: number): void {
    this.datos = []
    this.dataNames = []
    this.dataValues = []
    for(let i=0; i < this.qf.length; i++){
      if (this.qf[i].name == this.title[j]) {
        this.datos.push({ value: this.qf[i].value.first, name: this.qf[i].name })
        this.dataNames.push(this.qf[i].name)
        this.dataValues.push(this.qf[i].value.first)
        this.total = this.total - this.qf[i].value.first
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
          subtext: this.desc[j],
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
          subtext: this.desc[j],
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

  chooseGraph(): void {
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
