import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SliderComponent } from './components/slider/slider.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewsComponent } from './components/news/news.component';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MainPageComponent } from './components/main-page/main-page.component';
import { PriceDashboardComponent } from './components/prices/price-dashboard/price-dashboard.component';
import { PriceReviewComponent } from './components/prices/price-review/price-review.component';
import { NumberSuffixPipe } from './pipes/number-suffix.pipe';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NftComponent } from './components/nft/nft.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SliderComponent,
    NewsComponent,
    MainPageComponent,
    PriceDashboardComponent,
    PriceReviewComponent,
    NumberSuffixPipe,
    NftComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    MatCardModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
