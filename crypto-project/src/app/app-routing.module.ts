import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NewsComponent } from './components/news/news.component';
import { NftComponent } from './components/nft/nft.component';
import { PriceDashboardComponent } from './components/prices/price-dashboard/price-dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { SignInComponent } from './components/sign-in/sign-in.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'news',
    component: NewsComponent,
  },
  {
    path: 'main',
    component: MainPageComponent,
  },
  {
    path: 'prices',
    component: PriceDashboardComponent,
  },
  {
    path: 'nfts',
    component: NftComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'signin',
    component: SignInComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
