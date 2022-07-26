import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import Mentor from '../../assets/DataSet.json';

const routes = {
  produk: () => 'http://localhost:1337/api/produks?populate=*',
};

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private httpClient: HttpClient) {}

  getProduk(): Observable<string> {
    return this.httpClient.get(routes.produk()).pipe(
      map((body: any) => body),
      catchError(() => of('Error, could not load joke :-('))
    );
  }
}
