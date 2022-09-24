import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {  Observable,  tap } from 'rxjs';
import {
  IAuthResponseData,
  IRegisteredUser,
} from 'src/app/models/register.model';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private http: HttpClient, private router: Router) {}

  private dbUrl =
    'https://angular-crypto-project-default-rtdb.europe-west1.firebasedatabase.app/users.json';

  //save  users on database

  public signUp(
    email: string,
    password: string,
    userBody: IRegisteredUser
  ): Observable<IAuthResponseData> {
    return this.http
      .post<IAuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDrzkYbPCbto8GtDEeszg3Kb0PIndLx5U8',
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        tap((v) => {
          //send request to store user in database
          this.saveUserOnDb({ ...userBody, localId: v.localId })
          .subscribe();
        })
      );
  }

  //login
  public login(email: string, password: string): Observable<IAuthResponseData> {
    return this.http.post<IAuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDrzkYbPCbto8GtDEeszg3Kb0PIndLx5U8',
      { email: email, password: password, returnSecureToken: true }
    );
  }


  //save user on database
  public saveUserOnDb(user: IRegisteredUser): Observable<IRegisteredUser> {
    return this.http.post<IRegisteredUser>(this.dbUrl, user).pipe(
      tap((v) => {
        window.location.reload();
        this.router.navigateByUrl('/signin');
      })
    );
  }
  
  public getUsers() {
    return this.http.get(this.dbUrl);
  }
}
