import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import Mentor from '../../assets/DataSet.json';

const routes = {
  JSON: () => Mentor,
  Kue: () => 'http://localhost:1337/api/produks',
  prediksi: () => 'http://localhost:1337/api/produks?populate=*',
};

@Injectable({
  providedIn: 'root',
})
export class PrediksiService {
  constructor(private httpClient: HttpClient) {}

  getPrediksi(): Observable<string> {
    return this.httpClient.get(routes.prediksi()).pipe(
      map((body: any) => body),
      catchError(() => of('Error, could not load joke :-('))
    );
  }
  getDataKue(): Observable<string> {
    return this.httpClient.get(routes.Kue()).pipe(
      map((body: any) => body),
      catchError(() => of('Error, could not load joke :-('))
    );
  }
}
