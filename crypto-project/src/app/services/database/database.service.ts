import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { IRegisterForm, ISigninform } from 'src/app/models/register.model';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private http: HttpClient) {}

  private dbUrl =
    'https://angular-crypto-project-default-rtdb.europe-west1.firebasedatabase.app/users.json';

  //save  users on database

  public saveUser2(user: IRegisterForm): Observable<IRegisterForm> {
    return this.http.post<IRegisterForm>(this.dbUrl, user);
  }

  public saveUser(user: ISigninform) {
    this.http
      .post<ISigninform>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signupNewUser?key=AIzaSyDrzkYbPCbto8GtDEeszg3Kb0PIndLx5U8`,
        { ...user, returnSecureToken: true }
      )
      .subscribe();
  }

  public getUsers() {
    return this.http.get(this.dbUrl);
  }
}
