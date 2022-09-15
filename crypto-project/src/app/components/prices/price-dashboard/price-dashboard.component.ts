import { Component, OnInit } from '@angular/core';
import { PriceService } from 'src/app/services/prices/price.service';

@Component({
  selector: 'app-price-dashboard',
  templateUrl: './price-dashboard.component.html',
  styleUrls: ['./price-dashboard.component.scss'],
})
export class PriceDashboardComponent implements OnInit {
  constructor(private priceService: PriceService) {}

  ngOnInit(): void {
    // this.priceService.getCurrency().subscribe((v) => console.log(v));
    // this.priceService.getTrendingCurrency().subscribe((v) => console.log(v));
  }
}
