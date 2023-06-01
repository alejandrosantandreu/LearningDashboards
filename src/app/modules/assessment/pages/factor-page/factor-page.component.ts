import { Component, OnInit } from '@angular/core';
import { AssessmentService } from '@modules/assessment/services/assessment.service';
import { HttpClient } from '@angular/common/http';
import { QFModel } from '@core/qualityFactors.model';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';


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
  dataDate: Array<any> = []
  names: Array<any> = []
  barSeries: Array<any> = []

  pie: boolean = true;
  bar: boolean = false;
  type: string = '' 
  actualGroup: string =''
  desc: Array<any> = []
  title: Array<any> = []
  total: number = 1;
  present: Boolean = false;

  options: Array<any> = []
  individuals: Array<any> = []
  option0: any;
  option: any;
  opt: any;

  showDetails: boolean = false

  date: string=''
  existsDate: Boolean = false

  constructor(private assessmentservice: AssessmentService, private http: HttpClient, private dialogRef: MatDialog) { }

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
    this.openDialog('inicial')
  }

  openDialog(from: string) {
    if(from == 'inicial') {
      this.dialogRef.open(PopupComponent,
        {
          data : 'Select a group'
        });
    }
    else if (from == 'wrong') {
      this.dialogRef.open(PopupComponent,
        {
          data : 'Wrong dates'
        });
    }
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

  getbyDates(from: string, to: string): void {
    this.assessmentservice.getFactorsDate$('pes11a', from, to).subscribe( 
      result => {
          this.qf1 = result; 
      }
    );
    this.assessmentservice.getFactorsDate$('pes12a', from, to).subscribe( 
      result => {
          this.qf2 = result; 
      }
    );
    this.assessmentservice.getFactorsDate$('pes21a', from, to).subscribe( 
      result => {
          this.qf3 = result; 
      }
    );
    this.assessmentservice.getFactorsDate$('pes22a', from, to).subscribe( 
      result => {
          this.qf4 = result; 
      }
    );
  }

  deleteDate(): void {
    this.get()
    this.selectGroup(this.actualGroup)
    this.existsDate = false
  }

  sendDate(): void {
    let doc = document.getElementsByTagName("input"); 
    if(doc[0].value != '' && doc[1].value != null) {
      let x = doc[0].value.split('/')
      let year = x[2]
      let day = x[1]
      if(day.length == 1) {
        day = '0'+day
      }
      let month = x[0]
      if(month.length == 1) {
        month = '0'+month
      }
      let from = year+'-'+month+'-'+day
 
      x = doc[1].value.split('/')
      year = x[2]
      day = x[1]
      if(day.length == 1) {
        day = '0'+day
      }
      month = x[0]
      if(month.length == 1) {
        month = '0'+month
      }
      let to = year+'-'+month+'-'+day

      this.getbyDates(from, to)
      this.selectGroup(this.actualGroup)
      this.existsDate = true
    }
    else {
      this.openDialog('wrong')
      this.get()
      this.selectGroup(this.actualGroup)
    }
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
    this.individuals = []
    this.dataValues = []
    this.dataDate = []
    for(let i=0; i < this.qf.length; i++){
      if (this.qf[i].name == this.title[j]) {
        this.datos.push({ value: this.qf[i].value.first, name: this.qf[i].name })
        this.dataNames.push(this.qf[i].name)
        this.dataValues.push(this.qf[i].value.first)
        this.total = this.total - this.qf[i].value.first
      }
      if(this.qf[i].name == this.title[0]){
        this.dataDate.push(this.qf[i].date)
      }
    }
    
    if(this.total != 1 && this.total > 0 && this.title[j] == 'Unassigned Tasks') {
      this.datos.push({ value: this.total.toPrecision(2), name: 'Assigned tasks' })
      this.dataNames.push('Assigned tasks')
      this.dataValues.push(this.total.toPrecision(2))
    }
    this.total = 1
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
          orient: 'horizontal',
          bottom: 'bottom',
          itemGap: 20,
          top: 'auto',
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            mark: { show: true },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            type: 'pie',
            radius: '60%',
            label: {
              formatter: '{b|{b}：}{c}  {per|{d}%}  ',
              backgroundColor: '#F6F8FC',
              borderColor: '#8C8D8E',
              borderWidth: 1,
              borderRadius: 4,
              rich: {
                b: {
                  color: '#4C5058',
                  fontSize: 14,
                  fontWeight: 'bold',
                  lineHeight: 33
                },
                per: {
                  color: '#fff',
                  backgroundColor: '#4C5058',
                  padding: [3, 4],
                  borderRadius: 4
                }
              }
            },
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

      for(let i=0; i < this.dataValues.length; i++){
        this.createIndividual(i, j)
        this.individuals.push(this.option)
      }

      this.opt = {
        graph: this.option0,
        det: this.individuals
      }
      this.options.push(this.opt)
    }
    else if(this.type == 'Bar') {
      this.createBarSeries()
      this.option0 = {
        title: {
          text: this.title[j],
          subtext: this.desc[j],
          left: 'center',
        },
        legend: {
          data: this.names,
          orient: 'horizontal',
          bottom: 'bottom',
          itemGap: 20,
          top: 'auto',
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            mark: { show: true },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        xAxis: {
          type: 'category',
          axisTick: { show: false },
          data: this.dataDate
        },
        yAxis: {
          type: 'value'
        },
        series: this.barSeries
      }

      for(let i=0; i < this.dataValues.length; i++){
        this.createIndividual(i, j)
        this.individuals.push(this.option)
      }

      this.opt = {
        graph: this.option0,
        det: this.individuals
      }
      this.options.push(this.opt)
    }
  }

  createBarSeries(): void {
    this.names = []
    let nameExists = false
    for(let i=0; i < this.dataNames.length; i++){
      for(let j=0; j < this.names.length; j++){
        if(this.names[j] == this.dataNames[i]) {
          nameExists = true
        }
      }
      if(!nameExists) {
        this.names.push(this.dataNames[i])
      }
      nameExists = false
    }

    this.barSeries = []
    for(let j=0; j < this.names.length; j++){
      let barData = []
      for(let i=0; i < this.dataNames.length; i++){
        if(this.names[j] == this.dataNames[i]) {
          barData.push(this.dataValues[i].toPrecision(2))
        }
      }
      if(this.existsDate) {
        this.barSeries.push(
          {
            name: this.names[j],
            type: 'bar',
            top: 40,
            barGap: 0,
            emphasis: {
              focus: 'series'
            },
            data: barData
          }
        )
      }
      else {
        this.barSeries.push(
          {
            name: this.names[j],
            type: 'bar',
            top: 40,
            label: {
              show: true,
              position: 'inside',
              distance: 10,
              align: 'left',
              rotate: 90,
              formatter: '{c}',
              fontSize: 16,
              rich: {
                name: {}
              }
            },
            barGap: 0,
            emphasis: {
              focus: 'series'
            },
            data: barData
          }
        )
      }
    }
  }

  createIndividual(i: number, j: number): void {
    this.option = {
      legend: {
        show: true,
        data: this.dataDate,
        orient: 'horizontal',
        bottom: 'bottom',
      },
      series: [
        {
          type: 'gauge',
          name: this.dataDate[i],
          startAngle: 180,
          endAngle: 0,
          center: ['50%', '75%'],
          radius: '90%',
          min: 0,
          max: 1,
          splitNumber: 8,
          axisLine: {
            lineStyle: {
              width: 6,
              color: [
                [0.33, '#FF6E76'],
                [0.66, '#FDDD60'],
                [1, '#7CFFB2']
              ]
            }
          },
          pointer: {
            icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
            length: '12%',
            width: 20,
            offsetCenter: [0, '-60%'],
            itemStyle: {
              color: 'inherit'
            }
          },
          axisTick: {
            length: 12,
            lineStyle: {
              color: 'inherit',
              width: 2
            }
          },
          splitLine: {
            length: 20,
            lineStyle: {
              color: 'inherit',
              width: 5
            }
          },
          axisLabel: {
            color: '#464646',
            fontSize: 20,
            distance: -60,
            rotate: 'tangential',
          },
          title: {
            offsetCenter: [0, '20%'],
            fontSize: 20
          },
          detail: {
            fontSize: 30,
            offsetCenter: [0, '-35%'],
            valueAnimation: true,
            formatter: function (value: number) {
              return Math.round(value * 100) + '';
            },
            color: 'inherit'
          },
          data: [
            {
              value: this.dataValues[i],
              name: this.dataNames[i]
            }
          ]
        }
      ]
    };
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
