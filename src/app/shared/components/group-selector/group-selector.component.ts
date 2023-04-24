import { Component, Input, OnInit } from '@angular/core';
import { Router,NavigationEnd  } from '@angular/router';

@Component({
  selector: 'app-group-selector',
  templateUrl: './group-selector.component.html',
  styleUrls: ['./group-selector.component.css']
})
export class GroupSelectorComponent implements OnInit {

  currentRoute: string = ""
  group: Array<string> = []
  @Input() grup: 'grupo1' | 'grupo2' = 'grupo1'

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.group = [
      "grupo1","grupo2"
    ]

    this.currentRoute = this.router.url;
  }

}
