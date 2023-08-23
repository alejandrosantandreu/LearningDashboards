import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent implements OnInit {

  formSearch: FormGroup = new FormGroup({});

  stOptions: any = []
  fOptions: any = []
  mOptions: any = []

  constructor() { }

  ngOnInit(): void {
    this.formSearch = new FormGroup(
      {
        search: new FormControl('', [
          Validators.required
        ])
      }
    )

    this.stOptions = [
      {
        label: "Strategic Indicator",
        items: [
          { 
            label: 'Strategic Indicators',
            routerLink: ['/assessment/indicator'],
            routerLinkActiveOptions: {
              exact: true
            },
          },
          { 
            label: 'Strategic Indicators by Dates',
            routerLink: ['/assessment/indicator/date'],
            routerLinkActiveOptions: {
              exact: true
            },
          }
        ]
      }
    ];

    this.fOptions = [
      {
        label: "Factors",
        items: [
          { 
            label: 'Factors',
            routerLink: ['/assessment/factor'],
            routerLinkActiveOptions: {
              exact: true
            },
          },
          { 
            label: 'Factors by Dates',
            routerLink: ['/assessment/factor/date'],
            routerLinkActiveOptions: {
              exact: true
            },
          }
        ]
      }
    ];

    this.mOptions = [
      {
        label: "Metrics",
        items: [
          { 
            label: 'Metrics',
            routerLink: ['/assessment/metric'],
            routerLinkActiveOptions: {
              exact: true
            },
          },
          { 
            label: 'Metrics by Dates',
            routerLink: ['/assessment/metric/date'],
            routerLinkActiveOptions: {
              exact: true
            },
          }
        ]
      }
    ];
  }

}
