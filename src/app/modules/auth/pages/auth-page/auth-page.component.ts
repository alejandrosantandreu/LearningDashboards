import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {
  
  errorSession: boolean = false
  formLogin: FormGroup = new FormGroup({});

  constructor() { }

  ngOnInit(): void {
    this.formLogin = new FormGroup(
      {
        email: new FormControl('', [
          Validators.required,
          Validators.email
        ]),
        password: new FormControl('',
          [
            Validators.required,
            Validators.minLength(6)
          ])
      }
    )
  }

  sendLogin(): void {
    const { email, password } = this.formLogin.value
  }

}
