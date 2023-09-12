import { Component, OnInit } from '@angular/core';
import { AssessmentService } from '@modules/assessment/services/assessment.service';
import { HttpClient } from '@angular/common/http';
import { QFModel } from '@core/qualityFactors.model';

interface opt {
  name: string,
  description: string
}

@Component({
  selector: 'app-factor-page',
  templateUrl: './factor-page.component.html',
  styleUrls: ['./factor-page.component.css']
})
export class FactorPageComponent implements OnInit {
  
  nameDesc: opt[] = [
    {
      name: 'Commits Contribution',
      description: 'Groups the metrics that measure the percentage of commits made by a student with respect to the total number of commits of the project. Note: Merge commits are not taken into account.'
    },
    {
      name: 'Commits Management',
      description: 'Groups the metrics that measure the percentage of ' + "'" + 'anonymous' + "'" + ' commits, i.e. commits from unknown users which don' + "'" + 't match with any known contributor.'
    },
    {
      name: 'Commits Tasks Relation',
      description: 'Percentage of commits with references to tasks with respect to the total number of commits in the project, i.e. commits with the word \"task #X\" in them, where X is the task number in Taiga.'
    },
    {
      name: 'Deviation Metrics',
      description: 'Groups the metrics that measure the standard deviation of different entities, more specifically commits, tasks or task effort estimation.'
    },
    {
      name: 'Fulfillment of Tasks',
      description: 'Groups the metrics that measure the percentage of closed tasks made by a student with respect to the total number of tasks assigned to this student.'
    },
    {
      name: 'Modified Lines Contribution',
      description: 'Groups the metrics that measure the percentage of modified lines of code made by a student with respect to the total number of modified lines of code in the project. Note: Both additions and deletions are considered as modified lines.'
    },
    {
      name: 'Tasks Contribution',
      description: 'Groups the metrics that measure the percentage of tasks assigned to a student with respect to the total number of tasks in the project.'
    },
    {
      name: 'Tasks Effort Information',
      description: 'Groups the metrics that measure tasks effort information, both estimated and actual effort to raise awareness of the importance of accuracy in estimating the time spent on different sprint tasks.'
    },
    {
      name: 'Unassigned Tasks',
      description: 'Measures the percentage of tasks without assignee with respect to the total number of tasks defined in this sprint.'
    },
    {
      name: 'User Stories Definition Quality',
      description: 'Groups the metrics that measure the quality of user stories through the definition of acceptance criteria and the use of the specific pattern.'
    },
    {
      name: 'Activity Distribution',
      description: 'Groups the metrics that measure the percentage of work hours dedicated to a certain activity with respect to the number of hours in the project.'
    },
    {
      name: 'Dedication Contribution',
      description: 'Groups the metrics that measure the percentage of work hours dedicated to the project by a student with respect to the total number of hours in the project.'
    }
  ]

  nameDescCopy: any[] = []

  qualityFactors!: QFModel[]
  categories!: any[]
  selectedCat: string = ''
  groupCat: any[] = []
  showedOpt: opt[] = []
  groups: Array<string> = []

  graphics: Array<any> = []
  stacked: any

  datos: any
  rationale: Array<any> = []
  date: any
  stackedSeries: Array<any> = []

  admin: any = true

  constructor(private assessmentservice: AssessmentService, private http: HttpClient) { }

  ngOnInit(): void {
    if(window.sessionStorage.getItem('t') !== null) {
      if(window.sessionStorage.getItem('a') == 'false') {
        this.admin = false
      }
    }

     this.nameDescCopy = this.nameDesc.slice(0, -2)

     this.assessmentservice.getCategories().subscribe(
      res => {
        this.categories = res
      }
    )
  }

  get(g: string) {
    this.assessmentservice.getAllFactors(g).subscribe(
      res => {
        this.qualityFactors = res
        this.getCategory()
        this.showGraphics(g)
      }
    )
  }

  getCategory() {
    this.groupCat = []
    let aux = this.qualityFactors[6].rationale.slice(this.qualityFactors[6].rationale.indexOf('category'))
    let x = aux.slice(aux.indexOf(':') + 2, aux.indexOf('con') - 2)

    for(let i = 0; i < this.categories.length; i++) {
      if(this.categories[i].name.includes(x)) {
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
      this.get(g[i].name)
    }
  }

  selectShowedGraphs(selected: any) {
    this.graphics = []
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
    let aux = ration.split('{')
    aux = aux[1].split(';')
    let cat;
    for(let i = 0; i < aux.length; i++) {
      if(aux[i].includes('}')) {
        cat = aux[i]
        aux = aux.slice(0 ,i)
      }
    }
    for(let i = 0; i < aux.length; i++) {
      let n = aux[i].slice(aux[i].indexOf(' ') + 1, aux[i].indexOf('(') - 1)
      let val = aux[i].slice(aux[i].indexOf(':') + 2, aux[i].indexOf(','))
      this.rationale.push({ name: n, value: parseFloat(val).toPrecision(2)});
    }
    cat = cat.slice(cat.indexOf('category'))
    this.selectedCat =  cat = cat.slice(cat.indexOf(':') + 2)
  }

  takeData(j: number): void {
    this.datos = []
    this.rationale = []
    this.date = this.qualityFactors[0].date
    for(let i=0; i < this.qualityFactors.length; i++){
      if ((this.qualityFactors[i].description == this.showedOpt[j].description) 
      && ((this.qualityFactors[i].description == '' && this.qualityFactors[i].name == this.showedOpt[j].name) || this.qualityFactors[i].description != '')) {
        this.datos.push({ value: this.qualityFactors[i].value.first, name: this.qualityFactors[i].value.second })
        this.getRat(this.qualityFactors[i].rationale)
      }
    }
  }


  generateGraphics(j: number, g: string) {
    this.createStackedSeries(j)
    this.stacked = {
      title: {
        text: this.showedOpt[j].name,
        subtext: this.showedOpt[j].description,
        left: 'center',
      },
      /*tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },*/
      legend: {
        orient: 'horizontal',
        bottom: 0,
        itemGap: 20,
        
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
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
        data: [this.date]
      },
      yAxis: {
        type: 'value'
      },
      series: this.stackedSeries
    }

    let aux = {
      group: g,
      stacked: this.stacked,
    }
    this.graphics.push(aux)
  }

  createStackedSeries(f: number) {
    let catData = []

    for(let i = 0; i < this.categories.length; i++) {
      if(this.categories[i].name == this.selectedCat) {
        catData.push(this.categories[i])
      }
    }

    let linesData = []
    let avgCol = catData[0].color
    let aux = Math.abs(catData[0].upperThreshold - this.datos[0].value) 

    for(let i = 0; i < catData.length; i++) {
      linesData.push(
        {
          name: catData[i].type,
          yAxis: catData[i].upperThreshold,
          lineStyle: {
            color: catData[i].color,
            type: [5, 10],
            dashOffset: 10,
            opacity: 0.2
          },
        }
      )

      if(Math.abs(catData[i].upperThreshold - this.datos[0].value) < aux) {
        avgCol = catData[i].color
        aux = Math.abs(catData[i].upperThreshold - this.datos[0].value)
      }
    }

    
    if(this.showedOpt[f].name != 'Commits Contribution' && this.showedOpt[f].name != 'Commits Management' && this.showedOpt[f].name != 'Modified Lines Contribution') {
      linesData.push(
        {
          name: this.datos[0].name,
          label: {
            show: true,
            position: 'end',
            distance: 10,
            align: 'left',
            formatter: '{b}\n{c}',
            fontSize: 10
          },
          yAxis: this.datos[0].value,
          lineStyle: {
            color: avgCol,
            type: 'solid'
          },
        }
      )
    }
    
    this.stackedSeries = []
    for(let j=0; j < this.rationale.length; j++){
      this.stackedSeries.push(
        {
          name: this.rationale[j].name,
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
            data: linesData
          },
          emphasis: {
            focus: 'series'
          },
          data: [this.rationale[j].value]
        }
      )
    }
  }
}
