import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { PriceService } from 'src/app/services/prices/price.service';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, tap, BehaviorSubject } from 'rxjs';
import { IBalance, IcoinBase } from 'src/app/models/register.model';
import { DatabaseService } from 'src/app/services/database/database.service';
import { TokenStorageService } from 'src/app/services/tokenStorage/token-storage.service';

@Component({
  selector: 'app-price-dashboard',
  templateUrl: './price-dashboard.component.html',
  styleUrls: ['./price-dashboard.component.scss'],
})
export class PriceDashboardComponent implements OnInit, OnDestroy {
  constructor(
    private priceService: PriceService,
    private database: DatabaseService,
    private tokenService: TokenStorageService
  ) {}
  ngOnDestroy(): void {}

  exchanges: FormGroup = new FormGroup({
    coin: new FormControl<number | null>(null, { nonNullable: true }),
    currency: new FormControl<number | null>(null, { nonNullable: true }),
  });

  coins: any;
  pageIndex = 10;
  pageSize = 1;
  filterTerm!: string;

  //// pop window

  showTradeWindow: boolean = false;
  coinsname: string = '';
  coinsimg: string = '';
  price!: number;

  ////balance

  balance: BehaviorSubject<IBalance> = new BehaviorSubject({} as IBalance);

  ///enough money to buy?
  notEnoughMoney = false;

  /////success purchase

  successMsg = false;

  ngOnInit(): void {
    this.priceService.getCurrency().subscribe((v) => {
      this.coins = v;
    });

    this.registerValueChanges();

    this.balance = this.database.balance;
  }

  public onClickLeft() {
    if (this.pageIndex >= 20) {
      this.pageIndex -= 10;
      this.pageSize--;
    }
  }
  public onClickRight() {
    if (this.pageIndex < 100) {
      this.pageIndex += 10;
      this.pageSize++;
    }
  }

  public closeTradeWindow() {
    this.exchanges.reset();

    this.showTradeWindow = false;
  }

  public getCoin(name: string, price: number, img: string) {
    this.showTradeWindow = true;
    this.coinsname = name;
    this.coinsimg = img;
    this.price = price;
  }

  public registerValueChanges() {
    this.exchanges
      .get('coin')
      ?.valueChanges.pipe(
        debounceTime(200),
        tap((v) => {
          if (v) {
            let amountOfCurrency = v * this.price;

            this.exchanges
              .get('currency')
              ?.setValue(amountOfCurrency.toFixed(4), { emitEvent: false });
          }
        })
      )
      .subscribe();

    this.exchanges
      .get('currency')
      ?.valueChanges.pipe(
        debounceTime(400),
        tap((v) => {
          if (v) {
            let amountOfCoin = v / this.price;

            this.exchanges
              .get('coin')
              ?.setValue(amountOfCoin.toFixed(4), { emitEvent: false });
          }
        })
      )
      .subscribe();
  }

  public ecxhangeNow() {
    if (
      this.balance.getValue().balance > this.exchanges.get('currency')?.value
    ) {
      let dataForbase: IBalance = this.saveBalance() as IBalance;
      this.database
        .updateBalance(dataForbase)
        .pipe(
          tap(() => {
            this.updateUser(dataForbase);
            this.successMsg = true;

            setTimeout(() => {
              this.successMsg = false;
              this.showTradeWindow = false;
              this.exchanges.reset();
            }, 1300);
          })
        )
        .subscribe();
    } else {
      this.notEnoughMoney = true;

      setTimeout(() => {
        this.notEnoughMoney = false;
      }, 3000);
    }

    // console.log(this.balance);
  }

  private saveBalance(): IBalance {
    let savedBalance: IBalance = this.balance.getValue();

    if (savedBalance.coinBase) {
      if (savedBalance.coinBase[this.coinsname]) {
        savedBalance.coinBase[`${this.coinsname}`] +=
          this.exchanges.get('coin')?.value;
      } else {
        savedBalance.coinBase[`${this.coinsname}`] =
          this.exchanges.get('coin')?.value;
      }
    } else {
      savedBalance.coinBase = {} as IcoinBase;
      savedBalance.coinBase[`${this.coinsname}`] =
        this.exchanges.get('coin')?.value;
    }

    savedBalance.balance -= this.exchanges.get('currency')?.value;
    return savedBalance;
  }

  private updateUser(obj: IBalance) {
    let changedUser = this.tokenService.getUser();
    changedUser.balance = obj;
    this.tokenService.saveUser(changedUser);
    this.database.user$.next(changedUser);
  }
}
