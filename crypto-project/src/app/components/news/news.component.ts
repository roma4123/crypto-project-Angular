import { Component, OnInit } from '@angular/core';
import { IArticles } from 'src/app/models/news.models';
import { NewsService } from 'src/app/services/news/news.service';
import * as Aos from 'aos';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  constructor(private newsService: NewsService) {}

  articles: IArticles[] = [];

  maxPost = 5;

  public showMore(): void {
    this.maxPost = this.maxPost + 7;
  }

  ngOnInit(): void {
    //aos
    Aos.init();
    this.newsService.getNews().subscribe((v) => {
      this.articles = v.articles;
      console.log(v.articles);
    });


  }
}
