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
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
    responseType: 'text',
  }

  private headers = new HttpHeaders({
    accept: 'text/html, application/xhtml+xml, */*',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Acces-Control-Allow-Origin': '*',
    'Acces-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS, DELETE',
    'Acces-Control-Allow-Headers': 
      'Content-Type, Acces-Control-Allow-Headers, Authorization, X-Request-With',
  });

  getAllMetrics$(project: string): Observable<any> {
    return this.http.get<MetricModel[]>(`api/metrics/${project}`,
    {
      headers: this.headers
    })
  }

  getMetricsDate$(project: string, from: string, to: string): Observable<any> {
    return this.http.get<MetricModel[]>(`api/metrics/${project}/${from}/${to}`,
    {
      headers: this.headers
    })
    
  }

  getAllIndicators$(project: string): Observable<any> {
    return this.http.get<IndicatorModel[]>(`api/strategicIndicators/${project}`,
    {
      headers: this.headers
    })
    
  }

  getIndicatorsDate$(project: string, from: string, to: string): Observable<any> {
    return this.http.get<IndicatorModel[]>(`api/strategicIndicators/${project}/${from}/${to}`,
    {
      headers: this.headers
    })
    
  }

  getAllFactors$(project: string): Observable<any> {
    return this.http.get<QFModel[]>(`api/qualityFactors/${project}`,
    {
      headers: this.headers
    })
    
  }

  getFactorsDate$(project: string, from: string, to: string): Observable<any> {
    return this.http.get<QFModel[]>(`api/qualityFactors/${project}/${from}/${to}`,
    {
      headers: this.headers
    })
    
  }
}
