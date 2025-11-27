import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookiesStorage} from './cookies-storage';
import {map, Observable} from 'rxjs';
import {StatSeries, StatsResponse} from '../interfaces/api/stats-response';

@Injectable({
  providedIn: 'root'
})
export class StatIndicatorService {
  constructor(private http: HttpClient, private cookiesStorage:CookiesStorage) { }

  getIndicatorSeries(patientId: number, indicatorId: number):Observable<StatSeries> {
    return this.http.get<StatsResponse>(`api/patient/${patientId}/stats?indicatorId=${indicatorId}`).pipe(
      map(res => ({
          name: res.indicatorName,
          points:res.data
        }) as StatSeries )
    );
  }
}
