import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assessment-page',
  templateUrl: './assessment-page.component.html',
  styleUrls: ['./assessment-page.component.css']
})
export class AssessmentPageComponent implements OnInit {

  menuOptions: Array<any> = []

  constructor() { }

  ngOnInit(): void {
    this.menuOptions = [
      {
        name: 'Strategic Indicators',
        router: ['/','assessment', 'indicator'],
        desciption: ''
      },/*
      {
        name: 'Detailed Strategic Indicators',
        router: ['/', 'assessment', 'indicator', 'detailed'],
        desciption: ''
      },*/
      {
        name: 'Factors',
        router: ['/', 'assessment', 'factor'],
        desciption: ''
      },/*
      {
        name: 'Detailed Factors',
        router: ['/', 'assessment', 'factor', 'detailed'],
        desciption: ''
      },*/
      {
        name: 'Metrics',
        router: ['/', 'assessment', 'metric'],
        desciption: ''
      },/*
      {
        name: 'Raw Data',
        router: ['/', 'assessment', 'data'],
        desciption: ''
      },
      {
        name: 'Quality Model',
        router: ['/', 'assessment', 'model'],
        desciption: ''
      }*/
    ]
  }

}
