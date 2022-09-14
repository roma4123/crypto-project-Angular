import { Component, OnInit } from '@angular/core';
import { IArticles } from 'src/app/models/news.models';
import { NewsService } from 'src/app/services/news/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  constructor(private newsService: NewsService) {}

  articles: IArticles[] = [];

  ngOnInit(): void {
    this.newsService.getNews().subscribe((v) => {
      this.articles = v.articles;
      console.log(v.articles);
    });
  }
}
