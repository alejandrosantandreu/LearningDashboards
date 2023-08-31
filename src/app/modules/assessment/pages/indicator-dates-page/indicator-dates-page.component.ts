import { Component, OnInit } from '@angular/core';
import { AssessmentService } from '@modules/assessment/services/assessment.service';
import { HttpClient } from '@angular/common/http';
import { IndicatorModel } from '@core/indicator.model';

interface opt {
  name: string,
  description: string
}

interface datepicker {
  name: string,
  date: Date[]
}

@Component({
  selector: 'app-indicator-dates-page',
  templateUrl: './indicator-dates-page.component.html',
  styleUrls: ['./indicator-dates-page.component.css']
})
export class IndicatorDatesPageComponent {

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

  strategicIndicators!: IndicatorModel[]
  categories: any[] = []
  selectedCat: string = ''
  groupCat: any[] = []
  showedOpt: opt[] = []
  groups: Array<string> = []

  graphics: Array<any> = []
  stacked: any

  datos: any
  dataDates: Array<any> = []
  rationale: Array<any> = []
  stackedSeries: Array<any> = []

  constructor(private assessmentservice: AssessmentService, private http: HttpClient) { }

  ngOnInit(): void {
    this.dateOptionsCopy = this.dateOptions.slice(1)

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
    this.assessmentservice.getIndicatorsDate(g, dates).subscribe(
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
    this.dataDates = []
    let aux = this.strategicIndicators[0].name
    for(let i=0; i < this.strategicIndicators.length; i++){
      if ((this.strategicIndicators[i].description == this.showedOpt[j].description) 
      && ((this.strategicIndicators[i].description == '' && this.strategicIndicators[i].name == this.showedOpt[j].name) || this.strategicIndicators[i].description != '')) {
        this.datos.push({ value: this.strategicIndicators[i].value.first, name: this.strategicIndicators[i].value.second })
        this.getRat(this.strategicIndicators[i].rationale)
      }

      if(aux == this.strategicIndicators[i].name) {
        this.dataDates.push(this.strategicIndicators[i].date)
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
        data: this.dataDates
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

    let names: any[] = []
    let nameExists = false
    for(let i=0; i < this.rationale.length; i++){
      for(let j=0; j < names.length; j++){
        if(names[j] == this.rationale[i].name) {
          nameExists = true
        }
      }
      if(!nameExists) {
        names.push(this.rationale[i].name)
      }
      nameExists = false
    }
    
    this.stackedSeries = []
    for(let i=0; i < names.length; i++){
      let values = []
      for(let j=0; j < this.rationale.length; j++){
        if(names[i] == this.rationale[j].name) {
          values.push(this.rationale[j].value)
        }
      }
      this.stackedSeries.push(
        {
          name: names[i],
          type: 'bar',
          top: 40,
          /*label: {
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
          },*/
          markLine: {
            show: true,
            data: linesData
          },
          emphasis: {
            focus: 'series'
          },
          data: values
        }
      )
    }
  }
}
