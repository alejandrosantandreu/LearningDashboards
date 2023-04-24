import { Component, Input, OnInit, Output,  EventEmitter } from '@angular/core';
import { Router,NavigationEnd  } from '@angular/router';

@Component({
  selector: 'app-group-selector',
  templateUrl: './group-selector.component.html',
  styleUrls: ['./group-selector.component.css']
})
export class GroupSelectorComponent implements OnInit {

  selectedGroup: string = "";
  currentRoute: string = ""
  group: Array<string> = []
  @Output() newItemEvent = new EventEmitter<string>()

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.group = [
      "pes11a",
      "pes12a",
      "pes21a", 
      "pes22a"
    ]

    this.currentRoute = this.router.url;

    this.setGroup(this.group[0]);
  }

  setGroup(g: string): void {
      this.selectedGroup = g
      this.getGroup(this.selectedGroup)
  }

  getGroup(value: string) {
    this.newItemEvent.emit(value);
  }

}
