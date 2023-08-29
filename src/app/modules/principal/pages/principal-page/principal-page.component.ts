import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal-page',
  templateUrl: './principal-page.component.html',
  styleUrls: ['./principal-page.component.css']
})
export class PrincipalPageComponent implements OnInit {
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
