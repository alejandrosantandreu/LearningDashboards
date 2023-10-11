import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { AssessmentService } from '@modules/assessment/services/assessment.service';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { MetricModel } from '@core/metrics.model';

interface opt {
  name: string,
  description: string
}

@Component({
  selector: 'app-metric-page',
  templateUrl: './metric-page.component.html',
  providers: [AssessmentService],
  styleUrls: ['./metric-page.component.css']
})
export class MetricPageComponent implements OnInit {

  nameDesc: opt[] = [
    {
      name: 'Acceptance Criteria Application',
      description: 'Percentage of user stories with acceptance criteria with respect to the total number of user stories in this sprint'
    },
    {
      name: 'Assigned Tasks',
      description: 'Percentage of tasks made by a student with respect to the total number of tasks in the project'
    },
    {
      name: 'Closed Tasks with Actual Effort Information',
      description: 'Percentage of closed tasks with actual effort information added with respect to the total number of closed tasks in this sprint'
    },
    {
      name: 'Closed Tasks',
      description: 'Percentage of closed tasks made by a student with respect to the total number of tasks assigned to student'
    },
    {
      name: 'Commits',
      description: 'Percentage of commits made by a student with respect to the total number of commits in the project'
    },
    {
      name: "'" + "Anonymous"+"'"+' commits',
      description: 'Percentage of commits made by an unknown author with respect to all commits in the project'
    },
    {
      name: 'Commits Standard Deviation',
      description: ''
    },
    {
      name: 'Commits Tasks Relation',
      description: 'Percentage of commits with tasks references with respect to the total number of commits in the project'
    },
    {
      name: 'Deviation in Estimation of Task Effort',
      description: 'Percentage of closed tasks with more than +-25% of deviation in the task effort estimation in this sprint'
    },
    {
      name: 'Modified lines',
      description: 'Percentage of modified lines of code made by a student with respect to the total number of modified lines of code in the project'
    },
    {
      name: 'Use of User Story pattern',
      description: 'Percentage of user stories with the pattern (AS - I WANT - SO THAT - ) with respect to the total number of user stories in this sprint'
    },
    {
      name: 'Tasks Standard Deviation',
      description: ''
    },
    {
      name: 'Tasks with Estimated Effort Information',
      description: 'Percentage of tasks with estimated effort information added with respect to the total number of tasks in this sprint'
    },
    {
      name: 'Unassigned tasks',
      description: 'Percentage of tasks without assignee with respect to the total number of tasks in this sprint'
    },
    {
      name: 'Development hours',
      description: 'Percentage of development hours worked by the team with respect to the total hours worked in the project'
    },
    {
      name: 'Learning hours',
      description: 'Percentage of learning hours worked by the team with respect to the total hours worked in the project'
    },
    {
      name: 'Total hours',
      description: 'Percentage of total hours worked by a student with respect to the total hours worked in the project'
    }
  ]

  nameDescCopy: any[] = []

  representationType: Array<any> = [
    {
      name: 'Pie Chart'
    },
    {
      name: 'Bar Chart'
    },
    {
      name: 'Stacked Chart'
    }
  ]

  representationType2: Array<any> = [
    {
      name: 'Bar Chart'
    },
    {
      name: 'Progress Bar'
    }
  ]

  selectedRep: any = null

  metrics!: MetricModel[]
  categories!: any[]
  defaultCat: any[] = []
  groupCat: any[] = []
  showedOpt: opt[] = []
  groups: Array<string> = []
  nMembers: number = 0

  graphics: Array<any> = []
  pBar: Array<any> = []
  pie: any
  bar: any
  stacked: any

  datos: any
  dataNames: Array<any> = []
  dataValues: Array<any> = []
  rationale: Array<any> = []
  date: any
  names: Array<any> = []
  barSeries: Array<any> = []
  stackedSeries: Array<any> = []

  admin: any = true

  constructor(private assessmentservice: AssessmentService, private http: HttpClient, public router: Router) {}

  ngOnInit(): void {
    if(window.sessionStorage.getItem('t') !== null) {
      if(window.sessionStorage.getItem('a') == 'false') {
        this.admin = false
      }
    }

    this.selectedRep = this.representationType[0];

    this.nameDescCopy = this.nameDesc.slice(0, -3)

    this.assessmentservice.getCategories().subscribe(
      res => {
        this.categories = res
        for(let i = 0; i < this.categories.length; i++) {
          if(this.categories[i].name == 'Default') {
            this.defaultCat.push(this.categories[i])
          }
        }
      }
    )
  }

  get(g: string) {
    this.assessmentservice.getAllMetrics(g).subscribe(
      res => {
        this.metrics = res
        this.nMembers = 0
        for(let i = 0; i < this.metrics.length; i++) {
          if(this.metrics[i].description == this.nameDesc[3].description) {
            this.nMembers++
          }
        }
        this.getCategory()
        this.showGraphics(g)
      }
    )
  }

  getCategory() {
    this.groupCat = []
    for(let i = 0; i < this.categories.length; i++) {
      if(this.categories[i].name.includes(this.nMembers.toString() + " members")) {
        this.groupCat.push(this.categories[i])
      }
    }
  }

  showGraphics(g: string) {
    for(let i = 0; i < this.showedOpt.length; i++) {
      if(this.showedOpt[i].name == 'Assigned Tasks' || this.showedOpt[i].name == 'Closed Tasks' || 
      this.showedOpt[i].name == 'Commits' || this.showedOpt[i].name == 'Modified lines' 
      || this.showedOpt[i].name == 'Total hours') {
        this.takeDataTipo2(i)
        this.generateGraphics(i, g)
      }
      else {
        this.takeDataTipo1(i, g)
        this.generateGraphicsTipo1(i, g)
      }
    }
  }

  selectGroupsAdmin(g: Array<any>): void {
    this.groups = []
    this.graphics = []
    this.pBar = []
    this.rationale = []
    if(g.length == 0) this.showedOpt = []
    for(let i = 0; i < g.length; i++) {
      this.groups.push(g[i].name);
      this.get(g[i].name)
    }
  }

  selectShowedGraphs(selected: any) {
    this.graphics = []
    this.pBar = []
    this.rationale = []
    this.showedOpt = selected.value
    for(let i = 0; i < this.groups.length; i++) {
      this.get(this.groups[i])
    }
  }

  showOptions(): boolean {
    let retorno = false
    for(let i = 0; i < this.groups.length; i++) {
      if(this.groups[i].includes('asw')) retorno = true
    }
    return retorno
  }

  showMultiselect(): boolean {
    let retorno = false
    if (this.groups.length == 0) {
      retorno = true
    }
    return retorno
  }

  getRat(ration: any) {
    //let aux = ration.split('\n')
    let name1 = ration.slice(ration.indexOf('{') + 1, ration.indexOf('='))
    let val1 = ration.slice(ration.indexOf('=') + 1, ration.indexOf(','))
    let name2 = ration.slice(ration.indexOf(',') + 2)
    let val2 = name2.slice(name2.indexOf('=') + 1, name2.indexOf('}'))
    name2 = name2.slice(0, name2.indexOf('='))

    //this.rationale.push({ n1: name1, v1: parseFloat(val1).toPrecision(2), n2: name2, v2: parseFloat(val2).toPrecision(2)});
    if (parseInt(val1) > parseInt(val2)) {
      this.rationale.push({ n1: name1, v1: (parseInt(val1) - parseInt(val2)).toPrecision(2), n2: name2, v2: parseInt(val2).toPrecision(2)});
    }
    else {
      this.rationale.push({ n1: name2, v1: (parseInt(val2) - parseInt(val1)).toPrecision(2), n2: name1, v2: parseInt(val1).toPrecision(2)});
    }
  }

  takeDataTipo1(j: number, g: string): void {
    this.rationale = []
    this.dataNames = ['', '']
    this.dataValues = []
    for(let i=0; i < this.metrics.length; i++){
      if ((this.metrics[i].description == this.showedOpt[j].description) 
      && ((this.metrics[i].description == '' && this.metrics[i].name == this.showedOpt[j].name) || this.metrics[i].description != '')) {
        this.pBar.push({ value: this.metrics[i].value_description*100, name: this.metrics[i].name, group: g})
        this.dataValues.push(this.metrics[i].value_description)
        this.getRat(this.metrics[i].rationale)
      }
    }
  }



  takeDataTipo2(j: number): void {
    this.datos = []
    this.rationale = []
    this.dataNames = []
    this.dataValues = []
    this.date = this.metrics[0].date
    let total = 1
    for(let i=0; i < this.metrics.length; i++){
      if ((this.metrics[i].description == this.showedOpt[j].description) 
      && ((this.metrics[i].description == '' && this.metrics[i].name == this.showedOpt[j].name) || this.metrics[i].description != '')) {
        this.datos.push({ value: this.metrics[i].value_description, name: this.metrics[i].name })
        this.dataNames.push(this.metrics[i].name)
        this.dataValues.push(this.metrics[i].value_description)
        this.getRat(this.metrics[i].rationale)
        total = total - this.metrics[i].value_description
      }
    }
    if(total != 1 && total > 0) {
      if(this.showedOpt[j].name == 'Assigned Tasks') {
        this.datos.push({ value: total.toPrecision(2), name: 'Unassigned Tasks'})
        this.dataNames.push('Unassigned Tasks')
        this.dataValues.push(total.toPrecision(2))
      }
      else if (this.showedOpt[j].name == 'Unassigned Tasks'){
        this.datos.push({ value: total.toPrecision(2), name: 'Assigned tasks'})
        this.dataNames.push('Assigned tasks')
        this.dataValues.push(total.toPrecision(2))
      }
    }
    total = 1
  }

  changeSelected(i: number, change: any) {
    this.graphics[i].select = change
  }

  generateGraphics(j: number, g: string) {
    this.pie = {
      title: {
        text: this.showedOpt[j].name,
        subtext: this.showedOpt[j].description,
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
        top: 'bottom',
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

    this.createBarSeries(j)
    this.bar = {
      title: {
        text: this.showedOpt[j].name,
        subtext: this.showedOpt[j].description,
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
        top: 'bottom',
        feature: {
          mark: { show: true },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      xAxis: {
        type: 'category',
        axisTick: { show: false },
        data: [this.date]
      },
      yAxis: {
        type: 'value'
      },
      series: this.barSeries
    }
    
    this.createStackedSeries(j)
    this.stacked = {
      title: {
        text: this.showedOpt[j].name,
        subtext: this.showedOpt[j].description,
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        orient: 'horizontal',
        bottom: 0,
        itemGap: 20,
        
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '20%',
        containLabel: true
      },
      toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'bottom',
        feature: {
          mark: { show: true },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      xAxis: {
        type: 'category',
        axisTick: { show: false },
        data: [this.rationale[0].n1 + " vs " + this.rationale[0].n2]
      },
      yAxis: {
        type: 'value'
      },
      series: this.stackedSeries
    }

    let aux = {
      group: g,
      type: 'tipo2',
      pie: this.pie,
      bar: this.bar,
      stacked: this.stacked,
      select: this.representationType[0]
    }
    this.graphics.push(aux)
  }

  generateGraphicsTipo1(j: number, g: string) { 
    this.createStackedSeries(j)
    this.stacked = {
      title: {
        text: this.showedOpt[j].name,
        subtext: this.showedOpt[j].description,
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        orient: 'horizontal',
        bottom: 0,
        itemGap: 20,
        
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '20%',
        containLabel: true
      },
      toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'bottom',
        feature: {
          mark: { show: true },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      xAxis: {
        type: 'category',
        axisTick: { show: false },
        data: [this.rationale[0].n1 + " vs " + this.rationale[0].n2]
      },
      yAxis: {
        type: 'value'
      },
      series: this.stackedSeries
    }

    let aux = {
      group: g,
      type: 'tipo1',
      stacked: this.stacked,
      pBar: this.pBar,
      select: this.representationType2[0]
    }
    console.log(aux)
    this.graphics.push(aux)
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
        if(this.showedOpt[i].name == 'Assigned Tasks' || this.showedOpt[i].name == 'Commits' || 
        this.showedOpt[i].name == 'Total hours' || this.showedOpt[i].name == 'Modified lines')  {
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
                data: [
                  {
                    name: this.groupCat[0].type,
                    yAxis: this.groupCat[0].upperThreshold,
                    lineStyle: {
                      color: this.groupCat[0].color,
                      type: 'solid'
                    },
                  },
                  {
                    name: this.groupCat[1].type,
                    yAxis: this.groupCat[1].upperThreshold,
                    lineStyle: {
                      color: this.groupCat[1].color,
                      type: 'solid'
                    },
                  },
                  {
                    name: this.groupCat[2].type,
                    yAxis: this.groupCat[2].upperThreshold,
                    lineStyle: {
                      color: this.groupCat[2].color,
                      type: 'solid'
                    },
                  },
                  {
                    name: this.groupCat[3].type,
                    yAxis: this.groupCat[3].upperThreshold,
                    lineStyle: {
                      color: this.groupCat[3].color,
                      type: 'solid'
                    },
                  },
                  {
                    name: this.groupCat[4].type,
                    yAxis: this.groupCat[4].upperThreshold,
                    lineStyle: {
                      color: this.groupCat[4].color,
                      type: 'solid'
                    },
                  }
                ],
              },
              barGap: 0,
              emphasis: {
                focus: 'series'
              },
              data: barData
            }
          )
        }
        else if (this.showedOpt[i].name == 'Closed Tasks'){
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
                data: [
                  {
                    name: this.defaultCat[0].type,
                    yAxis: this.defaultCat[0].upperThreshold,
                    lineStyle: {
                      color: this.defaultCat[0].color,
                      type: 'solid'
                    },
                  },
                  {
                    name: this.defaultCat[1].type,
                    yAxis: this.defaultCat[1].upperThreshold,
                    lineStyle: {
                      color: this.defaultCat[1].color,
                      type: 'solid'
                    },
                  },
                  {
                    name: this.defaultCat[2].type,
                    yAxis: this.defaultCat[2].upperThreshold,
                    lineStyle: {
                      color: this.defaultCat[2].color,
                      type: 'solid'
                    },
                  }
                ],
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

  createStackedSeries(m: number) {
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

    let v1Data = []
    let v2Data = []
    for(let j=0; j < this.rationale.length; j++){
      v1Data.push(this.rationale[j].v1)
      v2Data.push(this.rationale[j].v2)
    }
    this.stackedSeries = []

    if(this.showedOpt[m].name != 'Tasks Standard Deviation') {
      for(let j=0; j < this.rationale.length; j++){
        this.stackedSeries.push(
          {
            name: this.rationale[0].n1 + " " + this.names[j],
            type: 'bar',
            stack: this.names[j],
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
            emphasis: {
              focus: 'series'
            },
            data: [this.rationale[j].v1]
          }
        )
        this.stackedSeries.push(
          {
            name: this.rationale[0].n2 + " " + this.names[j],
            type: 'bar',
            stack: this.names[j],
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
            emphasis: {
              focus: 'series'
            },
            data: [this.rationale[j].v2]
          }
        )
      }
    }
    else {
      this.stackedSeries.push(
        {
          name: this.showedOpt[m].name,
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
          emphasis: {
            focus: 'series'
          },
          data: this.dataValues
        }
      )
    }
  }
}

