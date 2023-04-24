import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-factor-detailed-page',
  templateUrl: './factor-detailed-page.component.html',
  styleUrls: ['./factor-detailed-page.component.css']
})
export class FactorDetailedPageComponent implements OnInit {

  menuOptions: Array<any> = []

  constructor() { }

  ngOnInit(): void {
    this.menuOptions = [
      {
        name: 'Star',
      },
      {
        name: 'Bar',
      }
    ]
  }

}
