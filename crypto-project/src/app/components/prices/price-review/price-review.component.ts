import { Component, OnInit } from '@angular/core';
import { PriceService } from 'src/app/services/prices/price.service';
import * as Aos from 'aos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-price-review',
  templateUrl: './price-review.component.html',
  styleUrls: ['./price-review.component.scss'],
})
export class PriceReviewComponent implements OnInit {
  constructor(private priceService: PriceService, private router: Router) {}

  prices: any;

  ngOnInit(): void {
    Aos.init();

    this.priceService.getTrendingCurrency().subscribe((v) => {
      this.prices = v;
      console.log(v);
    });
    // this.priceService
    //   .getGrpahicalCurrencyData('bitcoin')
    //   .subscribe((v) => console.log(v));
  }
}
