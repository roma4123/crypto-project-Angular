import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap, BehaviorSubject, map } from 'rxjs';
import {
  IAuthResponseData,
  IRegisteredUser,
} from 'src/app/models/register.model';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private http: HttpClient, private router: Router) {}

  user$: BehaviorSubject<IRegisteredUser> = new BehaviorSubject({
    email: '',
    fullname: { firstname: '', lastname: '' },
    balance: 0,
  } as IRegisteredUser);

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
          this.saveUserOnDb({ ...userBody, localId: v.localId }).subscribe(
            (v) => {
              // window.location.reload();
              this.router.navigateByUrl('/signin');
            }
          );
        })
      );
  }

  //login
  public login(email: string, password: string): Observable<IAuthResponseData> {
    return this.http
      .post<IAuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDrzkYbPCbto8GtDEeszg3Kb0PIndLx5U8',
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        tap((v) => {
          this.getSpecificUser(v.localId).subscribe({
            next: (v) => this.user$.next(v),
          });
        })
      );
  }

  //save user on database
  public saveUserOnDb(user: IRegisteredUser): Observable<IRegisteredUser> {
    return this.http.post<IRegisteredUser>(this.dbUrl, user);
  }

  public getUsers() {
    return this.http.get(this.dbUrl);
  }

  public getSpecificUser(localId: string): Observable<IRegisteredUser> {
    return this.http
      .get<IRegisteredUser>(this.dbUrl, {
        params: new HttpParams()
          .set('orderBy', '"localId"')
          .set('equalTo', `"${localId}"`),
      })
      .pipe(
        map((v: any) => {
          let obj: IRegisteredUser = {} as IRegisteredUser;
          for (let key in v) {
            obj = v[key];
          }
          return obj;
        })
      );
  }
}
