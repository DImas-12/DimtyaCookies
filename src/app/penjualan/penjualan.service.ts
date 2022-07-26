import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import Mentor from '../../assets/DataSet.json';

const routes = {
  penjualan: () => 'http://localhost:1337/api/produks?populate=*',
  Kue: () => 'http://localhost:1337/api/produks',
  penjualan2: () => 'http://localhost:1337/api/penjualans',
  penjualan3: () => 'http://localhost:1337/api/penjualans/',
};

@Injectable({
  providedIn: 'root',
})
export class PenjualanService {
  constructor(private httpClient: HttpClient) {}

  getPenjualan(): Observable<string> {
    return this.httpClient.get(routes.penjualan()).pipe(
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

  // CRUD
  PostPenjualan(Data: any): Observable<any> {
    console.log('data di service', Data);

    console.log('data di service tmp', Data);
    return this.httpClient.post(routes.penjualan2(), Data).pipe(
      map((body: any) => body),
      catchError(() => of('Error, could not load joke :-('))
    );
  }
  UpdataProduk(id: any, Data: any): Observable<any> {
    return this.httpClient.put(routes.penjualan3() + id, Data).pipe(
      map((body: any) => body),
      catchError(() => of('Error, could not load joke :-('))
    );
  }
  DeleteProduk(id: any): Observable<any> {
    return this.httpClient.delete(routes.penjualan3() + id).pipe(
      map((body: any) => body),
      catchError(() => of('Error, could not load joke :-('))
    );
  }
}
