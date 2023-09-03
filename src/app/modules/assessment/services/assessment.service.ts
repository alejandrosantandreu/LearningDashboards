import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { MetricModel } from '@core/metrics.model';
import { IndicatorModel } from '@core/indicator.model';
import { QFModel } from '@core/qualityFactors.model';
import { map, catchError } from 'rxjs/operators';

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
export class AssessmentService {
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

  getCategories(): Observable<any> {
    return this.http.get<any>(`${environment.api}/categories`,
    {
      headers: this.headers
    })
  }

  getAllMetrics(project: string): Observable<any> {
    return this.http.get<MetricModel>(`${environment.api}/metrics/${project}`,
    {
      headers: this.headers,
    })
  }

  getMetricsDate(project: string, date: string): Observable<any> {
    return this.http.get<MetricModel>(`${environment.api}/metrics/${project}/${date}`,
    {
      headers: this.headers,
    })
    
  }

  getAllIndicators(project: string): Observable<any> {
    return this.http.get<IndicatorModel>(`${environment.api}/strategic-indicators/${project}`,
    {
      headers: this.headers,
    })
    
  }

  getIndicatorsDate(project: string, date: string): Observable<any> {
    return this.http.get<IndicatorModel>(`${environment.api}/strategic-indicators/${project}/${date}`,
    {
      headers: this.headers,
    })
    
  }

  getAllFactors(project: string): Observable<any> {
    return this.http.get<QFModel>(`${environment.api}/quality-factors/${project}`,
    {
      headers: this.headers,
    })
    
  }

  getFactorsDate(project: string, date: string): Observable<any> {
    return this.http.get<QFModel>(`${environment.api}/quality-factors/${project}/${date}`,
    {
      headers: this.headers,
    })
  }
}
