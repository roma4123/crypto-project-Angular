import { Component, OnInit, OnDestroy } from '@angular/core';
import { PriceService } from 'src/app/services/prices/price.service';

@Component({
  selector: 'app-price-dashboard',
  templateUrl: './price-dashboard.component.html',
  styleUrls: ['./price-dashboard.component.scss'],
})
export class PriceDashboardComponent implements OnInit, OnDestroy {
  constructor(private priceService: PriceService) {}
  ngOnDestroy(): void {}

  coins: any;

  pageIndex = 10;

  pageSize = 1;

  ngOnInit(): void {
    window.scroll(0, 0);

    // this.priceService.getCurrency().subscribe((v) => console.log(v));
    // this.priceService.getTrendingCurrency().subscribe((v) => console.log(v));
    this.priceService.getCurrency().subscribe((v) => {
      this.coins = v;
    });
  }

  onClickLeft() {
    if (this.pageIndex >= 20) {
      this.pageIndex -= 10;
      this.pageSize--;
    }
  }
  onClickRight() {
    if (this.pageIndex < 100) {
      this.pageIndex += 10;
      this.pageSize++;
    }
  }
}
