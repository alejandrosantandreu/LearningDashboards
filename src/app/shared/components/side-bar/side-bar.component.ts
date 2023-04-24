import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  mainMenu: {
    assessment: Array<any>, prediction: Array<any>, simulation: Array<any>,
  } = { assessment: [], prediction: [], simulation: [] }

  settings: any

  constructor() { }

  ngOnInit(): void {
    this.mainMenu.assessment = [
      {
        name: 'Strategic Indicators',
        router: ['/','assessment', 'indicator'],
      },
      {
        name: 'Detailed Strategic Indicators',
        router: ['/', 'assessment', 'indicator', 'detailed']
      },
      {
        name: 'Factors',
        router: ['/', 'assessment', 'factor'],
      },
      {
        name: 'Detailed Factors',
        router: ['/', 'assessment', 'factor', 'detailed']
      },
      {
        name: 'Metrics',
        router: ['/', 'assessment', 'metric']
      },
      {
        name: 'Raw Data',
        router: ['/', 'assessment', 'data'],
      },
      {
        name: 'Quality Model',
        router: ['/', 'assessment', 'model'],
      }
    ]

    this.mainMenu.prediction = [
      {
        name: 'Strategic Indicators',
        router: ['/', 'prediction', 'indicator'],
      },
      {
        name: 'Detailed Strategic Indicators',
        router: ['/', 'prediction', 'indicator', 'detailed']
      },
      {
        name: 'Factors',
        router: ['/', 'prediction', 'factor'],
      },
      {
        name: 'Detailed Factors',
        router: ['/', 'prediction', 'factor', 'detailed']
      },
      {
        name: 'Metrics',
        router: ['/', 'prediction', 'metric']
      }
    ]

    this.mainMenu.simulation = [
      {
        name: 'Factors',
        router: ['/', 'simulation', 'factor'],
      },
      {
        name: 'Metrics',
        router: ['/', 'simulation', 'metric']
      },
      {
        name: 'Quality Model',
        router: ['/', 'simulation', 'model'],
      }
    ]

    this.settings ={
      icon: 'uil-setting',
      router: ['/', 'setting']
    }
  }
}
