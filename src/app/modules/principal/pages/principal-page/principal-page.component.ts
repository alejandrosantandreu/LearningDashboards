import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal-page',
  templateUrl: './principal-page.component.html',
  styleUrls: ['./principal-page.component.css']
})
export class PrincipalPageComponent implements OnInit {
  options: any;
  menuOptions: Array<any> = []

  constructor() { }

  ngOnInit(): void {
    this.menuOptions = [
      {
        name: 'Assessment',
        router: ['/','assessment'],
        description: 'It shows the different variety of graphics and metrics of the selected project.'
      },
      {
        name: 'Prediction',
        router: ['/', 'prediction',],
        description: ''
      },
      {
        name: 'Simulation',
        router: ['/', 'simulation'],
        description: ''
      },
      {
        name: 'Alerts',
        router: ['/', 'alert'],
        description: ''
      },
      {
        name: 'Quality Requirements',
        router: ['/', 'requirement'],
        description: ''
      },
      {
        name: 'Decision',
        router: ['/', 'decision'],
        description: ''
      }
    ]
  }

}
