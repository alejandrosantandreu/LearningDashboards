import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { AssessmentService } from '@modules/assessment/services/assessment.service';
import { HttpClient } from '@angular/common/http';
import { MetricModel } from '@core/metrics.model';

interface opt {
  name: string,
  description: string
}

interface datepicker {
  name: string,
  date: Date[]
}

@Component({
  selector: 'app-metric-dates-page',
  templateUrl: './metric-dates-page.component.html',
  styleUrls: ['./metric-dates-page.component.css']
})
export class MetricDatesPageComponent {

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
      name: 'Bar Chart'
    },
    {
      name: 'Stacked Chart'
    }
  ]

  dateOptions: datepicker[] = [
    {
      name: 'Custom Dates',
      date: []
    },
    {
      name: 'Last week',
      date: []
    },
    {
      name: 'Last two weeks',
      date: []
    },
    {
      name: 'Last month',
      date: []
    },
    {
      name: 'Last three months',
      date: []
    },
    {
      name: 'Last six months',
      date: []
    }
  ]

  dateOptionsCopy: any[] = []

  selectedDefault!: datepicker;
  rangeDates: Date[] = [];
  minDate: Date = new Date();
  lastWeek: Date = new Date();
  last2Weeks: Date = new Date();
  lastmonth: Date = new Date();
  last3months: Date = new Date();
  maxDate: Date = new Date();

  selectedRep: any = null

  metrics!: MetricModel[]
  categories!: any[]
  defaultCat: any[] = []
  groupCat: any[] = []
  showedOpt: opt[] = []
  groups: Array<string> = []
  nMembers: number = 0

  graphics: Array<any> = []
  bar: any
  stacked: any

  dataNames: Array<any> = []
  dataValues: Array<any> = []
  dataDates: Array<any> = []
  rationale: Array<any> = []
  names: Array<any> = []
  barSeries: Array<any> = []
  stackedSeries: Array<any> = []

  admin: any = true

  constructor(private assessmentservice: AssessmentService, private http: HttpClient) {}

  ngOnInit(): void {
    if(window.sessionStorage.getItem('t') !== null) {
      if(window.sessionStorage.getItem('a') == 'false') {
        this.admin = false
      }
    }
    
    this.selectedRep = this.representationType[0];

    this.nameDescCopy = this.nameDesc.slice(0, -3)

    this.dateOptionsCopy = this.dateOptions.slice(1)

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

    this.iniDates() 
  }

  iniDates() {
    let month = this.maxDate.getMonth();
    let year = this.maxDate.getFullYear();

    this.lastWeek.setDate(this.maxDate.getDate() - 7)
    this.dateOptions[1].date = [this.lastWeek, this.maxDate]

    this.last2Weeks.setDate(this.maxDate.getDate() - 14)
    this.dateOptions[2].date = [this.last2Weeks, this.maxDate]

    let prevMonth = (month === 0) ? 11 : month -1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    this.lastmonth.setMonth(prevMonth);
    this.lastmonth.setFullYear(prevYear);
    this.dateOptions[3].date = [this.lastmonth, this.maxDate]

    let threeMonth = (month === 0) ? 9 : month -3;
    threeMonth = (month === 1) ? 10 : month -3;
    threeMonth = (month === 2) ? 11 : month -3;
    prevYear = (threeMonth === 11 || threeMonth === 10 || threeMonth === 9) ? year - 1 : year;
    this.last3months.setMonth(threeMonth);
    this.last3months.setFullYear(prevYear);
    this.dateOptions[4].date = [this.last3months, this.maxDate]
    
    let sixMonth = (month === 0) ? 6 : month -6;
    sixMonth = (month === 1) ? 7 : month -6;
    sixMonth = (month === 2) ? 8 : month -6;
    sixMonth = (month === 3) ? 9 : month -6;
    sixMonth = (month === 4) ? 10 : month -6;
    sixMonth = (month === 5) ? 11 : month -6;
    prevYear = (sixMonth === 11 || sixMonth === 10 || sixMonth === 9 || 
      sixMonth === 8 || sixMonth === 7 || sixMonth === 6) ? year - 1 : year;
    this.minDate.setMonth(sixMonth);
    this.minDate.setFullYear(prevYear);
    this.dateOptions[5].date = [this.minDate, this.maxDate]
  }

  takeDefault() {
    if(this.selectedDefault !== undefined && this.rangeDates != this.selectedDefault.date && this.selectedDefault.date[0] != this.maxDate) {
      this.rangeDates = this.selectedDefault.date
      if(this.selectedDefault != this.dateOptions[0]) {
        this.dateOptions[0].date = []
      }
      this.getData()
    }
  }

  customRange() {
    if(this.rangeDates !== undefined) {
      this.dateOptions[0].date = [this.rangeDates[0], this.rangeDates[1]]
      this.selectedDefault = this.dateOptions[0]
      this.getData()
    }
  }

  getData() {
    this.graphics = []
    this.rationale = []
    for(let i = 0; i < this.groups.length; i++) {
      this.get(this.groups[i])
    }
  }

  formatDates(): string {
    let retorno = ''
    for(let i = 0; i < this.rangeDates.length; i++) {
      retorno += this.rangeDates[i].getFullYear().toString() + '-';
      if(this.rangeDates[i].getMonth() < 9) {
        retorno += '0' + (this.rangeDates[i].getMonth() + 1).toString() + '-'
      }
      else {
        retorno += (this.rangeDates[i].getMonth() + 1).toString() + '-'
      }
      if(this.rangeDates[i].getDate() < 10) {
        retorno += '0' + this.rangeDates[i].getDate().toString() + '/'
      }
      else {
        retorno += this.rangeDates[i].getDate().toString() + '/'
      }
    }
    return retorno
  }

  get(g: string) {
    let dates = this.formatDates()
    this.assessmentservice.getMetricsDate(g, dates).subscribe(
      res => {
        this.metrics = res
        let d = this.metrics[0].date
        this.nMembers = 0
        for(let i = 0; i < this.metrics.length; i++) {
          if(this.metrics[i].description == this.nameDesc[2].description && this.metrics[i].date == d) {
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
      this.takeData(i)
      this.generateGraphics(i, g)
    }
  }

  selectGroupsAdmin(g: Array<any>): void {
    this.groups = []
    this.graphics = []
    this.rationale = []
    if(g.length == 0) this.showedOpt = []
    for(let i = 0; i < g.length; i++) {
      this.groups.push(g[i].name);
      if(this.rangeDates.length > 0) {
        this.get(g[i].name)
      }
    }
  }

  selectShowedGraphs(selected: any) {
    this.graphics = []
    this.rationale = []
    this.showedOpt = selected.value
    for(let i = 0; i < this.groups.length; i++) {
      if(this.rangeDates.length == 0) {
        this.rangeDates = [this.maxDate, this.maxDate]
        this.dateOptions[0].date = [this.rangeDates[0], this.rangeDates[1]]
        this.selectedDefault = this.dateOptions[0]
      }
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
    let aux = ration.split('\n')
    let name1 = aux[2].slice(aux[2].indexOf('{') + 1, aux[2].indexOf('='))
    let val1 = aux[2].slice(aux[2].indexOf('=') + 1, aux[2].indexOf(','))
    let name2 = aux[2].slice(aux[2].indexOf(',') + 2)
    let val2 = name2.slice(name2.indexOf('=') + 1, name2.indexOf('}'))
    name2 = name2.slice(0, name2.indexOf('='))
    
    this.rationale.push({ n1: name1, v1: parseInt(val1), n2: name2, v2: parseInt(val2)});
    /*if (parseInt(val1) > parseInt(val2)) {
      this.rationale.push({ n1: name1, v1: parseInt(val1) - parseInt(val2), n2: name2, v2: parseInt(val2)});
    }
    else {
      this.rationale.push({ n1: name1, v1: parseInt(val1), n2: name2, v2: parseInt(val2) - parseInt(val1)});
    }*/
  }



  takeData(j: number): void {
    this.rationale = []
    this.dataNames = []
    this.dataValues = []
    this.dataDates = []
    let aux = this.metrics[0].name
    for(let i=0; i < this.metrics.length; i++){
      if ((this.metrics[i].description == this.showedOpt[j].description) 
      && ((this.metrics[i].description == '' && this.metrics[i].name == this.showedOpt[j].name) || this.metrics[i].description != '')) {
        this.dataNames.push(this.metrics[i].name)
        this.dataValues.push(this.metrics[i].value_description)
        this.getRat(this.metrics[i].rationale)
      }

      if(aux == this.metrics[i].name) {
        this.dataDates.push(this.metrics[i].date)
      }
    }
  }

  changeSelected(i: number, change: any) {
    this.graphics[i].select = change
  }

  generateGraphics(j: number, g: string) {
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
        data: this.dataDates
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
      bar: this.bar,
      stacked: this.stacked,
      select: this.representationType[0]
    }
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
                show: false,
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
                show: false,
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
                show: false,
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

  createStackedSeries(i: number) {
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
}
