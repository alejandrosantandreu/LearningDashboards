import { Component, OnInit } from '@angular/core';
import { AssessmentService } from '@modules/assessment/services/assessment.service';
import { HttpClient } from '@angular/common/http';
import { IndicatorModel } from '@core/indicator.model';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';

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
  dataDate: Array<any> = []
  names: Array<any> = []
  barSeries: Array<any> = []

  pie: boolean = true;
  bar: boolean = false;
  type: string = '' 
  actualGroup: string =''
  qF: any
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

  getbyDates(from: string, to: string): void {
    this.assessmentservice.getIndicatorsDate$('pes11a', from, to).subscribe( 
      result => {
          this.indicators1 = result; 
      }
    );
    this.assessmentservice.getIndicatorsDate$('pes12a', from, to).subscribe( 
      result => {
          this.indicators2 = result; 
      }
    );
    this.assessmentservice.getIndicatorsDate$('pes21a', from, to).subscribe( 
      result => {
          this.indicators3 = result; 
      }
    );
    this.assessmentservice.getIndicatorsDate$('pes22a', from, to).subscribe( 
      result => {
          this.indicators4 = result; 
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
    this.individuals = []
    this.dataValues = []
    this.dataDate = []
    for(let i=0; i < this.indicators.length; i++){
      if (this.indicators[i].name == this.title[j]) {
        this.datos.push({ value: this.indicators[i].value.first, name: this.indicators[i].name })
        this.dataNames.push(this.indicators[i].name)
        this.dataValues.push(this.indicators[i].value.first)
        this.total = this.total - this.indicators[i].value.first
      }
      if(this.indicators[i].name == this.title[0]){
        this.dataDate.push(this.indicators[i].date)
      }
    }
    this.total = 1
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
