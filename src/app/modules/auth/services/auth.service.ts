import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private headers = new HttpHeaders({
    accept: 'text/html, application/xhtml+xml, */*',
    'Content-Type': 'application/json',
    'Acces-Control-Allow-Origin': '*',
    'Acces-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS, DELETE',
    'Acces-Control-Allow-Headers': 
      'Content-Type, Acces-Control-Allow-Headers, Authorization, X-Request-With',
  });

  login(user: any): Observable<any> {
    return this.http.post(`api/users/login`, user, 
    {
      headers: this.headers,
    });
  }
  /*register(user: any): Observable<any> {
    return this.http.post("https://reqres.in/api/register", user);
  }*/
}
