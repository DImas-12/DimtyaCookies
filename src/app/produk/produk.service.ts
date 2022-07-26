import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import Mentor from '../../assets/DataSet.json';

const routes = {
  produk: () => 'http://localhost:1337/api/produks',
  produk2: () => 'http://localhost:1337/api/produks/',
};

@Injectable({
  providedIn: 'root',
})
export class ProdukService {
  constructor(private httpClient: HttpClient) {}

  getProduk(): Observable<string> {
    return this.httpClient.get(routes.produk()).pipe(
      map((body: any) => body),
      catchError(() => of('Error, could not load joke :-('))
    );
  }

  PostProduk(Data: any): Observable<any> {
    console.log('data di service', Data);

    console.log('data di service tmp', Data);
    return this.httpClient.post(routes.produk(), Data).pipe(
      map((body: any) => body),
      catchError(() => of('Error, could not load joke :-('))
    );
  }
  UpdataProduk(id: any, Data: any): Observable<any> {
    return this.httpClient.put(routes.produk2() + id, Data).pipe(
      map((body: any) => body),
      catchError(() => of('Error, could not load joke :-('))
    );
  }
  DeleteProduk(id: any): Observable<any> {
    return this.httpClient.delete(routes.produk2() + id).pipe(
      map((body: any) => body),
      catchError(() => of('Error, could not load joke :-('))
    );
  }
}
