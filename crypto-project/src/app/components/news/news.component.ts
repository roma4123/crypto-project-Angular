import { Component, OnInit, OnDestroy } from '@angular/core';
import { IArticles } from 'src/app/models/news.models';
import { NewsService } from 'src/app/services/news/news.service';
import * as Aos from 'aos';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit, OnDestroy {
  constructor(private newsService: NewsService) {}

  articles: IArticles[] = [];
  newsError = '';
  maxPost = 5;

  public showMore(): void {
    this.maxPost = this.maxPost + 7;
  }

  ngOnInit(): void {
    //aos
    Aos.init();
    this.newsService.getNews().subscribe({
      next: (v) => {
        this.articles = v.articles;
        this.newsError = '';
      },
      error: (err) => {
        if (err.error.code === 'corsNotAllowed') {
          this.newsError = err.error.message;
        } else {
          this.newsError = 'Oops... something went wrong';
        }
      },
    });
  }

  ngOnDestroy(): void {
    window.scroll(0, 0);
  }
}
