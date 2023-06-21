import { Component, Input, OnInit, Output,  EventEmitter } from '@angular/core';
import { Router,NavigationEnd  } from '@angular/router';
import { GroupServiceService } from '../../services/group-service.service';

@Component({
  selector: 'app-group-selector',
  templateUrl: './group-selector.component.html',
  styleUrls: ['./group-selector.component.css']
})
export class GroupSelectorComponent implements OnInit {

  selectedGroup: string = "";
  currentRoute: string = ""
  data: Array<any> = []
  group: Array<string> = []
  @Output() newItemEvent = new EventEmitter<string>()

  constructor(private GroupService: GroupServiceService, private router: Router) { }

  ngOnInit(): void {
    this.get()
  }

  async get(): Promise<any> {
    this.data = await this.GroupService.getAllProjects$().toPromise()
    
    for(let i = 0; i < this.data.length; i++){
      this.group.push(this.data[i].name)
    }
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
