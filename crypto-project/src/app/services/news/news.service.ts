import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INews } from 'src/app/models/news.models';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private http: HttpClient) {}

  date = new Date();

  year = this.date.getFullYear;
  month = this.date.getMonth;
  day = this.date.getDay;

  newDate = `${this.year}-${this.month}-${this.day}`;

  public getNews(): Observable<INews> {
    return this.http.get<INews>(
      ` https://newsapi.org/v2/everything?q=(crypto AND bitcoin)&from=${this.newDate}&sortBy=publishedAt&apiKey=`
    );
  }
}
