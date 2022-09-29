import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SliderComponent } from './components/slider/slider.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewsComponent } from './components/news/news.component';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MainPageComponent } from './components/main-page/main-page.component';
import { PriceDashboardComponent } from './components/prices/price-dashboard/price-dashboard.component';
import { PriceReviewComponent } from './components/prices/price-review/price-review.component';
import { NumberSuffixPipe } from './pipes/number-suffix.pipe';
import { NftComponent } from './components/nft/nft.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { RegisterComponent } from './components/register/register.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ForClickDirective } from './for-click.directive';
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
    RegisterComponent,
    SignInComponent,
    ProfileComponent,
    ForClickDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
