import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { map, mergeMap, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {

  private readonly URL = environment.api
  
  constructor(private http: HttpClient) { 
    
  }

  getAllMetrics$(): Observable<any> {
    return this.http.get(`${this.URL}/metrics/current?prj=pes11a`)
    .pipe(
      map(({ data }: any) => {
        return data
      })
    )
  }
}
