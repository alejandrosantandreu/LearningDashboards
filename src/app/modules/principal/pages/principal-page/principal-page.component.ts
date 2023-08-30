import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

interface route {
  text: string,
  route: string,
}

interface opt {
  name: string,
  options: route[]
}

@Component({
  selector: 'app-principal-page',
  templateUrl: './principal-page.component.html',
  styleUrls: ['./principal-page.component.css']
})
export class PrincipalPageComponent implements OnInit {
  nameDesc: opt[] = [
    {
      name: 'Strategic Indicators',
      options: [
        {
          text: 'Current Assessment: Strategic Indicators',
          route: '/assessment/indicator'
        },
        {
          text: 'Strategic Indicators by Dates',
          route: '/assessment/indicator/dates'
        }
      ]
    },
    {
      name: 'Factors',
      options: [
        {
          text: 'Current Assessment: Factors',
          route: '/assessment/factor'
        },
        {
          text: 'Factors by Dates',
          route: '/assessment/factor/dates'
        }
      ]
    },
    {
      name: 'Metrics',
      options: [
        {
          text: 'Current Assessment: Metrics',
          route: '/assessment/metric'
        },
        {
          text: 'Metrics by Dates',
          route: '/assessment/metric/dates'
        }
      ]
    },
  ]
  
  options: any;
  menuOptions: Array<any> = []
  login: any = true

  constructor(private cdref: ChangeDetectorRef) { }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  ngOnInit(): void {
    this.menuOptions = [
      {
        name: 'Assessment',
        router: ['/','assessment'],
        description: 'It shows the different variety of graphics and metrics of the selected project.'
      },
    ]
  }

}
