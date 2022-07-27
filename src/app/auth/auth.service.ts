import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const routes = {
  login: () => 'http://localhost:1337/api/auth/local',
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  // loginUser(email: string, password: string): Observable<any> {
  //   console.log('tokenya', environment);
  //   const tmp = {
  //     email: email,
  //     hashed_password: password,
  //   };
  //   console.log('data login', tmp);
  //   return this.apollo
  //     .mutate({
  //       mutation: gql`
  //       mutation {
  //         loginUser(loginInput:{email: "${email}", hashed_password: "${password}"}) {
  //           value
  //         }
  //       }
  //     `,
  //     })
  //     .pipe(
  //       map((resp) => {
  //         console.log('resp', resp);
  //         this.userLogin(resp.data);
  //         return resp;
  //       })
  //     );
  // }
  loginUser(Data: any): Observable<any> {
    console.log('data di service', Data);

    console.log('data di service tmp', Data);
    return this.httpClient.post(routes.login(), Data).pipe(
      map((resp: any) => {
        console.log('responya tolong?', resp);
        this.userLogin(resp.jwt);
        return resp;
      })
    );
  }
  userLogin(data: any) {
    localStorage.setItem(
      environment.tokenKey,
      // JSON.stringify(data.loginUser.value)
      JSON.stringify(`Bearer ${data}`)
    );
    console.log('datalocalnya dong token', localStorage);
  }
}
