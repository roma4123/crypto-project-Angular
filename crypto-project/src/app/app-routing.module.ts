import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NewsComponent } from './components/news/news.component';
import { PriceDashboardComponent } from './components/prices/price-dashboard/price-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'news', component: NewsComponent },
  { path: 'main', component: MainPageComponent },
  { path: 'prices', component: PriceDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
