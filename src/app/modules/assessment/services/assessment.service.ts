import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { MetricModel } from '@core/metrics.model';
import { IndicatorModel } from '@core/indicator.model';
import { QFModel } from '@core/qualityFactors.model';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {

  private readonly URL = environment.api
  
  constructor(private http: HttpClient) { 
    
  }

  getAllMetrics$(project: string): Observable<MetricModel[]> {
    return this.http.get<MetricModel[]>(`${this.URL}/metrics/current?prj=${project}`)
    
  }

  getMetricsDate$(project: string, from: string, to: string): Observable<MetricModel[]> {
    return this.http.get<MetricModel[]>(`${this.URL}/metrics/historical?prj=${project}&from=${from}&to=${to}`)
    
  }

  getAllIndicators$(project: string): Observable<IndicatorModel[]> {
    return this.http.get<IndicatorModel[]>(`${this.URL}/strategicIndicators/current?prj=${project}`)
    
  }

  getIndicatorsDate$(project: string, from: string, to: string): Observable<IndicatorModel[]> {
    return this.http.get<IndicatorModel[]>(`${this.URL}/strategicIndicators/historical?prj=${project}&from=${from}&to=${to}`)
    
  }

  getAllFactors$(project: string): Observable<QFModel[]> {
    return this.http.get<QFModel[]>(`${this.URL}/qualityFactors/current?prj=${project}`)
    
  }

  getFactorsDate$(project: string, from: string, to: string): Observable<QFModel[]> {
    return this.http.get<QFModel[]>(`${this.URL}/qualityFactors/historical?prj=${project}&from=${from}&to=${to}`)
    
  }
}
