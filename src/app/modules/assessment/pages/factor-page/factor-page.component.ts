import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-factor-page',
  templateUrl: './factor-page.component.html',
  styleUrls: ['./factor-page.component.css']
})
export class FactorPageComponent implements OnInit {

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
