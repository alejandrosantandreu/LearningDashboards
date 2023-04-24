import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prediction-page',
  templateUrl: './prediction-page.component.html',
  styleUrls: ['./prediction-page.component.css']
})
export class PredictionPageComponent implements OnInit {

  menuOptions: Array<any> = []

  constructor() { }

  ngOnInit(): void {
    this.menuOptions = [
      {
        name: 'Strategic Indicators',
        router: ['/','prediction', 'indicator'],
        desciption: ''
      },
      {
        name: 'Detailed Strategic Indicators',
        router: ['/', 'prediction', 'indicator', 'detailed'],
        desciption: ''
      },
      {
        name: 'Factors',
        router: ['/', 'prediction', 'factor'],
        desciption: ''
      },
      {
        name: 'Detailed Factors',
        router: ['/', 'prediction', 'factor', 'detailed'],
        desciption: ''
      },
      {
        name: 'Metrics',
        router: ['/', 'prediction', 'metric'],
        desciption: ''
      }
    ]
  }

}
