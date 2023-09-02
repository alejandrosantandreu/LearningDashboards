import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import {
  MessageService, PrimeNGConfig
} from 'primeng/api';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {


  errorSession: boolean = false
  formLogin = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder,public authService: AuthService, public router: Router, private messageService: MessageService,) { }

  ngOnInit(): void {
  }

  login(): void {
    if(this.formLogin.value.username !== undefined && this.formLogin.value.username !== null) {
      const user = { username:this.formLogin.value.username, password:this.formLogin.value.password } 
      //window.sessionStorage.setItem("u", this.formLogin.value.username);
      this.authService.login(user).subscribe(
        (data) => {
          if(data[0] === undefined) {
            this.messageService.add({
              key: 'submit',
              severity: 'error',
              summary: 'Something went wrong',
              detail: 'Username or password is not correct',
              life: 6000
            });
          }
          else {
            window.sessionStorage.setItem("t", JSON.stringify(data));
            window.sessionStorage.setItem("u", data[0].username);
            window.sessionStorage.setItem("p", data[0].project);
            window.sessionStorage.setItem("a", data[0].admin);
            this.router.navigateByUrl("/home");
          }
          
        },
        error => {
          console.log(error);
        }
      )

    }
    
  }

}
