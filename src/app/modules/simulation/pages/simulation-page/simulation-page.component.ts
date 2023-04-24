import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simulation-page',
  templateUrl: './simulation-page.component.html',
  styleUrls: ['./simulation-page.component.css']
})
export class SimulationPageComponent implements OnInit {

  menuOptions: Array<any> = []

  constructor() { }

  ngOnInit(): void {
    this.menuOptions = [
      {
        name: 'Factors',
        router: ['/', 'simulation', 'factor'],
        desciption: ''
      },
      {
        name: 'Metrics',
        router: ['/', 'simulation', 'metric'],
        desciption: ''
      },
      {
        name: 'Quality Model',
        router: ['/', 'simulation', 'model'],
        desciption: ''
      }
    ]
  }

}
