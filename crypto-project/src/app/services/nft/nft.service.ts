import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{Observable} from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class NftService {

  constructor(private http: HttpClient) { }

  getnft(): Observable<any> {
    return this.http.get(
      'https://api.rarify.tech/data/contracts',
      {
        headers: new HttpHeaders({
          'Authorization': 'f074cbc1-f67c-40bb-924e-b9719fc369f3',
        }),
      }
    );
  }
}
