import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupServiceService {

  private readonly URL = environment.api

  constructor(private http: HttpClient) { }

  getAllProjects$(): Observable<any> {
    return this.http.get<any>(`${this.URL}/projects`)
  }
}
