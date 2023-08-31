import { Component, OnInit } from '@angular/core';
import { AssessmentService } from '@modules/assessment/services/assessment.service';
import { HttpClient } from '@angular/common/http';
import { IndicatorModel } from '@core/indicator.model';

interface opt {
  name: string,
  description: string
}

@Component({
  selector: 'app-indicator-page',
  templateUrl: './indicator-page.component.html',
  styleUrls: ['./indicator-page.component.css']
})
export class IndicatorPageComponent implements OnInit {

  nameDesc: opt[] = [
    {
      name: 'Backlog Management',
      description: ''
    },
    {
      name: 'Information Completeness',
      description: ''
    },
    {
      name: 'Repository Contribution',
      description: ''
    }
  ]

  strategicIndicators!: IndicatorModel[]
  categories: any[] = []
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

  constructor(private assessmentservice: AssessmentService, private http: HttpClient) { }

  ngOnInit(): void {
  }

  get(g: string) {
    this.assessmentservice.getAllIndicators(g).subscribe(
      res => {
        this.strategicIndicators = res
        this.getCategory()
        this.showGraphics(g)
      }
    )
  }

  getCategory() {
    this.categories = this.strategicIndicators[0].probabilities
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
    for(let i = 0; i < aux.length; i++) {
      if(aux[i].includes('}')) {
        aux = aux.slice(0 ,i)
      }
    }
    for(let i = 0; i < aux.length; i++) {
      let n = aux[i].slice(aux[i].indexOf(' ') + 1, aux[i].indexOf('(') - 1)
      let val = aux[i].slice(aux[i].indexOf(':') + 2, aux[i].indexOf(','))
      this.rationale.push({ name: n, value: parseFloat(val).toPrecision(2)});
    }
  }

  takeData(j: number): void {
    this.datos = []
    this.rationale = []
    this.date = this.strategicIndicators[0].date
    for(let i=0; i < this.strategicIndicators.length; i++){
      if ((this.strategicIndicators[i].description == this.showedOpt[j].description) 
      && ((this.strategicIndicators[i].description == '' && this.strategicIndicators[i].name == this.showedOpt[j].name) || this.strategicIndicators[i].description != '')) {
        this.datos.push({ value: this.strategicIndicators[i].value.first, name: this.strategicIndicators[i].value.second })
        this.getRat(this.strategicIndicators[i].rationale)
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

  createStackedSeries(i: number) {
    let linesData = []
    let avgCol = this.categories[0].color
    let aux = Math.abs(this.categories[0].upperThreshold - this.datos[0].value) 

    console.log(this.categories)

    for(let i = 0; i < this.categories.length; i++) {
      linesData.push(
        {
          name: this.categories[i].label,
          yAxis: this.categories[i].upperThreshold,
          lineStyle: {
            color: this.categories[i].color,
            type: [5, 10],
            dashOffset: 10,
            opacity: 0.2
          },
        }
      )

      if(Math.abs(this.categories[i].upperThreshold - this.datos[0].value) < aux) {
        avgCol = this.categories[i].color
        aux = Math.abs(this.categories[i].upperThreshold - this.datos[0].value)
      }
    }

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

    console.log(linesData)
    
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
