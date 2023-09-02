import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GroupService } from '../../services/group.service'

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
  
  login: any = false
  
  admin: any = true
  project: any
  data!: any[]
  taigaURL: any = ''
  githubURL: any = ''

  constructor(private cdref: ChangeDetectorRef, private groupService: GroupService) { }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  ngOnInit(): void {
    if(window.sessionStorage.getItem('t') !== null) {
      this.login = true
      if(window.sessionStorage.getItem('a') == 'false') {
        this.admin = false
        this.project = window.sessionStorage.getItem('p')?.toUpperCase()
        this.groupService.getAllProjects().subscribe(
          res => {
            this.data = res
            for(let i = 0; i < this.data.length; i++) {
              if(this.data[i].name == window.sessionStorage.getItem('p')) {
                this.taigaURL = this.data[i].taigaURL
                this.githubURL = this.data[i].githubURL
                continue
              }
            }
          }
        )
      }
    }
  }

}
