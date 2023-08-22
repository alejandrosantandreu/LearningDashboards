import { Component, OnInit} from '@angular/core';
import { AssessmentService } from '@modules/assessment/services/assessment.service';

import { HttpClient } from '@angular/common/http';
import { MetricModel } from '@core/metrics.model';


@Component({
  selector: 'app-metric-page',
  templateUrl: './metric-page.component.html',
  providers: [AssessmentService],
  styleUrls: ['./metric-page.component.css']
})
export class MetricPageComponent implements OnInit {

  menuOptions: Array<any> = []

  metrics: Array<MetricModel> = []

  datos: any
  dataNames: Array<any> = []
  dataValues: Array<any> = []
  dataDate: Array<any> = []
  names: Array<any> = []
  barSeries: Array<any> = []

  pie: boolean = true;
  bar: boolean = false;
  type: string = '' 
  actualGroup: string =''
  qF: any
  title: Array<String> = []
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

  constructor(private assessmentservice: AssessmentService, private http: HttpClient) {}

  ngOnInit(): void {
    this.menuOptions = [
      {
        name: 'Pie',
      },
      {
        name: 'Bar',
      }
    ]
  
  }



  async get(g: string): Promise<any> {
    this.metrics = await this.assessmentservice.getAllMetrics$(g).toPromise()
    this.selectGroup(g)
  }

  async getbyDates(g: string, from: string, to: string): Promise<any> {
    this.metrics = await this.assessmentservice.getMetricsDate$(g, from, to).toPromise()
    this.selectGroup(g)
  }

  deleteDate(): void {
    this.get(this.actualGroup)
    this.existsDate = false
  }

  sendDate(): void {
    let doc = document.getElementsByTagName("input"); 
    if(doc[0].value != '' && doc[1].value != '') {
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

      let fromsp = from.split('-')
      let tosp = to.split('-')
      console.log(parseInt(fromsp[0]))
      console.log(parseInt(tosp[0]))
      if(parseInt(fromsp[0]) > parseInt(tosp[0])) {

        this.get(this.actualGroup)
      }
      else if(parseInt(fromsp[0]) == parseInt(tosp[0]) && parseInt(fromsp[1]) > parseInt(tosp[1])) {

        this.get(this.actualGroup)
      }
      else if(parseInt(fromsp[0]) == parseInt(tosp[0]) && parseInt(fromsp[1]) == parseInt(tosp[1]) && parseInt(fromsp[2]) > parseInt(tosp[2])) {

        this.get(this.actualGroup)
      }
      else {
        this.getbyDates(this.actualGroup, from, to)
        this.existsDate = true
      }
    }
    else {

      this.get(this.actualGroup)
    }
  }

  selectGroup(g: string): void {
    this.actualGroup = g;
    this.options = []

    this.description()
    for(let j=0; j < this.qF.length; j++){
      this.takeData(j)
      this.generateGraphics(j)
    }
  }

  takeName(name: string): void {
    if(name.includes('tasks')) {
      if(name.includes('closed')) {
        this.title.push('Closed Tasks')
      }
      else if(name.includes('Unassigned')) {
        this.title.push('Unassigned Tasks')
      }
      else this.title.push('Tasks')
    }
    else if(name.includes('commits')) {
      if(name.includes('Anonymous')) {
        this.title.push('Anonymous Commits')
      }
      else this.title.push('Commits')
    }
    else if(name.includes('lines')) {
      this.title.push('Modified Lines')
    }
    else if(name.includes('hours')) {
      if(name.includes('Development')) {
        this.title.push('Development Hours')
      }
      else if(name.includes('Learning')) {
        this.title.push('Learning Hours')
      }
      else this.title.push('Total Hours')
    }
    else {
      this.title.push(name)
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
      if(!this.present || (this.metrics[i].description == '' 
        && ((!this.existsDate) || (this.existsDate && this.metrics[i].name != this.metrics[i-1].name)))) {
        this.qF.push(this.metrics[i].description)
        this.takeName(this.metrics[i].name)
      }
    }
  }

  takeData(j: number): void {
    this.datos = []
    this.individuals = []
    this.dataNames = []
    this.dataValues = []
    this.dataDate = []
    for(let i=0; i < this.metrics.length; i++){
      if (this.metrics[i].description == this.qF[j]) {
        if(this.metrics[i].description == '') {
          if (this.metrics[i].name == this.title[j]) {
            this.datos.push({ value: this.metrics[i].value_description, name: this.metrics[i].name })
            this.dataNames.push(this.metrics[i].name)
            this.dataValues.push(this.metrics[i].value_description)
            this.total = this.total - this.metrics[i].value_description
          }
        }
        else {
          this.datos.push({ value: this.metrics[i].value_description, name: this.metrics[i].name })
          this.dataNames.push(this.metrics[i].name)
          this.dataValues.push(this.metrics[i].value_description)
          this.total = this.total - this.metrics[i].value_description
        } 
      }
      if(this.metrics[i].description == this.qF[0]){
        this.dataDate.push(this.metrics[i].date)
      }
    }
    if(this.total != 1 && this.total > 0) {
      if(this.title[j] == 'Tasks') {
        
        this.datos.push({ value: this.total.toPrecision(2), name: 'Not Assigned' })
        this.dataNames.push('Not Assigned')
        this.dataValues.push(this.total.toPrecision(2))
      }
      else if (this.title[j] == 'Unassigned Tasks'){
        this.datos.push({ value: this.total.toPrecision(2), name: 'Assigned tasks' })
        this.dataNames.push('Assigned tasks')
        this.dataValues.push(this.total.toPrecision(2))
      }
    }
    this.total = 1
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
            radius: '50%',
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
            top: 20,
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
        if (this.dataNames[i] != 'Not Assiged') {
          this.createIndividual(i, j)
        }
        this.individuals.push(this.option)
      }

      this.opt = {
        graph: this.option0,
        det: this.individuals
      }
      this.options.push(this.opt)
    }
    else if(this.type == 'Bar') {
      this.createBarSeries(j)
      this.option0 = {
        title: {
          text: this.title[j],
          subtext: this.qF[j],
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
        if (this.dataNames[i] != 'Not Assiged') {
          this.createIndividual(i, j)
        }
        this.individuals.push(this.option)
      }

      this.opt = {
        graph: this.option0,
        det: this.individuals
      }
      this.options.push(this.opt)
    }
  }

  createBarSeries(i: number): void {
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
          barData.push(this.dataValues[i])
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
        if(this.title[i] == "Tasks" || this.title[i] == 'Commits' || 
        this.title[i] == 'Total Hours' || this.title[i] == 'Modified Lines')  {
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
              markLine: {
                lineStyle: [{
                  color: '#008000'
                }],
                show: true,
                data: [{
                  name: 'Positive threshold lower limit',
                  yAxis: 0.12
                },
                {
                  name: 'Positive threshold higher limit',
                  yAxis: 0.22
                }],
                
              },
              barGap: 0,
              emphasis: {
                focus: 'series'
              },
              data: barData
            }
          )
        }
        else if (this.title[i] == 'Closed Tasks'){
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
              markLine: {
                show: true,
                data: [{
                  name: 'Positive threshold lower limit',
                  yAxis: 0.66
                },
                {
                  name: 'Positive threshold higher limit',
                  yAxis: 1
                }],
                lineStyle: [{
                  color: '#008000'
                }],
              },
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
  }

  createIndividual(i: number, j: number): void {
    if(this.title[j] == 'Tasks' || this.title[j] == 'Commits' || this.title[j].match("Hours"))  {
      this.option = {
        series: [
          {
            type: 'gauge',
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
                  [0.07, '#FF6E76'],
                  [0.12, '#FDDD60'],
                  [0.22, '#7CFFB2'],
                  [0.32, '#FDDD60'],
                  [1, '#FF6E76']
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
    else {
      this.option = {
        series: [
          {
            type: 'gauge',
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

