import { Inject, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  constructor (@Inject('BASE_API_URL') private baseUrl: string) {}

  intercept(
    request: HttpRequest<any>, 
    next: HttpHandler
  ):  Observable<HttpEvent<any>> {
    const api = request.clone ({ url: `${this.baseUrl}/${request.url}` });
    return next.handle(api);
  }
}

@Injectable({
  providedIn: 'root'
})
export class GroupServiceService {
  constructor(private http: HttpClient) {}

  private httpOptions = {
    headers : new HttpHeaders({
      accept: 'text/html, application/xhtml+xml, */*',
      'Content-Type': 'application/json',
    }),
    responseType: 'text',
  }

  private headers = new HttpHeaders({
    accept: 'text/html, application/xhtml+xml, */*',
    'Content-Type': 'application/json',
    'Acces-Control-Allow-Origin': '*',
    'Acces-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS, DELETE',
    'Acces-Control-Allow-Headers': 
      'Content-Type, Acces-Control-Allow-Headers, Authorization, X-Request-With',
  });

  getAllProjects(): Observable<any> {
    //return this.http.get<any[]>(`api/projects`);
    /*return this.http.get(`api/projects`, 
    {
      headers: this.headers,
      responseType: 'json',
    });*/

    return this.http.get(`${environment.api}/projects`,
    {
      headers: this.headers
    });
  }
}
