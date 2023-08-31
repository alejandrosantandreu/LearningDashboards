import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent implements OnInit {

  formSearch: FormGroup = new FormGroup({});

  homeopt: any = []
  stOptions: any = []
  fOptions: any = []
  mOptions: any = []

  home = true
  st = false
  fact = false
  met = false

  constructor(private router: Router, private cdref: ChangeDetectorRef,) { }

  ngAfterContentChecked() {
    this.changeActive()
    this.cdref.detectChanges();
  }

  ngOnInit(): void {
    this.formSearch = new FormGroup(
      {
        search: new FormControl('', [
          Validators.required
        ])
      }
    )

    this.homeopt = [
      {
        label: "Home",
        routerLink: ['/home'],
            routerLinkActiveOptions: {
              exact: true
            },
      }
    ];

    this.stOptions = [
      {
        label: "Strategic Indicator",
        items: [
          { 
            label: 'Current Assessment Strategic Indicators',
            routerLink: ['/assessment/indicator'],
            routerLinkActiveOptions: {
              exact: true
            },
          },
          { 
            label: 'Strategic Indicators by Dates',
            routerLink: ['/assessment/indicator/dates'],
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
            label: 'Current Assessment Factors',
            routerLink: ['/assessment/factor'],
            routerLinkActiveOptions: {
              exact: true
            },
          },
          { 
            label: 'Factors by Dates',
            routerLink: ['/assessment/factor/dates'],
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
            label: 'Current Assessment Metrics',
            routerLink: ['/assessment/metric'],
            routerLinkActiveOptions: {
              exact: true
            },
          },
          { 
            label: 'Metrics by Dates',
            routerLink: ['/assessment/metric/dates'],
            routerLinkActiveOptions: {
              exact: true
            },
          }
        ]
      }
    ];

    this.changeActive()
  }

  changeActive() {
    if(this.router.url.includes('indicator')) {
      this.st = true
      this.home = false
      this.fact = false
      this.met = false
    }
    else if(this.router.url.includes('factor')) {
      this.st = false
      this.home = false
      this.fact = true
      this.met = false
    }
    else if(this.router.url.includes('metric')) {
      this.st = false
      this.home = false
      this.fact = false
      this.met = true
    }
    else {
      this.st = false
      this.home = true
      this.fact = false
      this.met = false
    }
  }

}
