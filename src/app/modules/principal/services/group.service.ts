import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

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
export class GroupService {

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers : new HttpHeaders({
      accept: 'text/html, application/xhtml+xml, */*',
      'Content-Type': 'application/json',
    }),
    responseType: 'text',
  }

  getAllProjects(): Observable<any[]> {  
    return this.http.get<any[]>(`${environment.api}/projects`);
  }
}
