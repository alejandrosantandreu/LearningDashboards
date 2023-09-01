import { Component, Input, OnInit, Output,  EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Router,NavigationEnd  } from '@angular/router';
import { GroupServiceService } from '../../services/group-service.service';
import { Observable, first } from 'rxjs';

@Component({
  selector: 'app-group-selector',
  templateUrl: './group-selector.component.html',
  styleUrls: ['./group-selector.component.css']
})
export class GroupSelectorComponent implements OnInit {

  selectedGroups: any[] = []
  data!: any[]
  dataCopy!: any[]
  asw: any[] = []
  pes: any[] = []
  @Output() newItemEvent = new EventEmitter<Array<any>>()

  admin: any = true
  project: any = ''
  group: any

  constructor(private GroupService: GroupServiceService, private router: Router) { }

  ngOnInit(): void {
    if(window.sessionStorage.getItem('t') !== null) {
      if(window.sessionStorage.getItem('a') == 'false') {
        this.admin = false
        this.project = window.sessionStorage.getItem('p')?.toUpperCase()
      }
    }
    else this.router.navigateByUrl("/home");
    this.GroupService.getAllProjects().subscribe(
      res => {
        this.data = res
        this.dataCopy = res
        for(let i = 0; i < this.data.length; i++) {
          if(this.admin) {
            if(this.data[i].name.includes('asw')) {
              this.asw.push(this.data[i])
            }
            else {
              this.pes.push(this.data[i])
            }
          }
          else if(this.data[i].name == window.sessionStorage.getItem('p')) {
            this.getGroup([this.data[i]])
          }
        }
      }
      
    )
  }

  changeOptions() {
    this.data = this.dataCopy
    for(let i = 0; i < this.selectedGroups.length; i++) {
      if(this.selectedGroups[i].name.includes('asw')) {
        this.data = this.asw
        break
      }
      else if(this.selectedGroups[i].name.includes('pes')) {
        this.data = this.pes
        break
      }
    }
  }

  setGroup(g: any): void {
    this.selectedGroups = g.value
    this.getGroup(this.selectedGroups)
    this.changeOptions()
  }

  getGroup(value: Array<string>) {
    this.newItemEvent.emit(value);
  }

}
