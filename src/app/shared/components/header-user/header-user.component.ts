import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent implements OnInit {

  formSearch: FormGroup = new FormGroup({});

  constructor() { }

  ngOnInit(): void {
    this.formSearch = new FormGroup(
      {
        search: new FormControl('', [
          Validators.required
        ])
      }
    )
  }

}
