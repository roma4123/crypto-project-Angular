import { Component, OnInit } from '@angular/core';
import {
  IBalance,
  IcoinBase,
  IRegisteredUser,
} from 'src/app/models/register.model';
import { BehaviorSubject, debounceTime, of, tap } from 'rxjs';
import { DatabaseService } from 'src/app/services/database/database.service';
import { TokenStorageService } from 'src/app/services/tokenStorage/token-storage.service';
import { FormControl, FormGroup } from '@angular/forms';
import { PriceService } from 'src/app/services/prices/price.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private databaseService: DatabaseService,
    private tokenService: TokenStorageService,
    private priceService: PriceService
  ) {}

  exchanges: FormGroup = new FormGroup({
    coin: new FormControl<number | null>(null, { nonNullable: true }),
    currency: new FormControl<number | null>(null, { nonNullable: true }),
  });

  user$: BehaviorSubject<IRegisteredUser> = new BehaviorSubject(
    {} as IRegisteredUser
  );

  // coinPrice!: number;
  coins: any;
  price!: number;
  coinsname: string = '';

  localId: BehaviorSubject<string> = new BehaviorSubject('');
  ////balance
  balance: BehaviorSubject<IBalance> = new BehaviorSubject({} as IBalance);

  ///////////all coins prices from service
  allCoinsPrice: any[] = [];
  //////////////pop up for sell
  showTradeWindow: boolean = false;

  ///enough money to buy?
  notEnoughMoney = false;

  /////success purchase
  successMsg = false;

  public closeTradeWindow() {
    this.exchanges.reset();

    this.showTradeWindow = false;
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
      this.balance.getValue().coinBase[this.coinsname] >=
      this.exchanges.get('coin')?.value
    ) {
      let dataForbase: IBalance = this.saveBalance() as IBalance;
      this.databaseService
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
    let savedBalance: IBalance = this.balance.getValue() as IBalance;

    if (savedBalance.coinBase) {
      if (savedBalance.coinBase[this.coinsname]) {
        savedBalance.coinBase[`${this.coinsname}`] -=
          this.exchanges.get('coin')?.value;
      }
      if (savedBalance.coinBase[this.coinsname] === 0) {
        delete savedBalance.coinBase[this.coinsname];

        if (savedBalance.coinBase) {
          this.coinNames = Object.getOwnPropertyNames(savedBalance.coinBase);
        }
      }
    } else {
      savedBalance.coinBase = {} as IcoinBase;
      savedBalance.coinBase[`${this.coinsname}`] =
        this.exchanges.get('coin')?.value;
    }

    savedBalance.balance += Number(
      this.exchanges.get('currency')?.value
    ) as number;
    // console.log(typeof Number(this.exchanges.get('currency')?.value));
    return savedBalance;
  }

  private updateUser(obj: IBalance) {
    let changedUser = this.tokenService.getUser();
    changedUser.balance = obj;
    this.tokenService.saveUser(changedUser);
    this.databaseService.user$.next(changedUser);
  }

  public onSell(coinsname: string) {
    let currentcoinObj = this.allCoinsPrice.find(
      (v) => v.name.toUpperCase() === coinsname.toUpperCase()
    );
    this.coinsname = currentcoinObj?.name;
    this.price = currentcoinObj?.current_price;

    this.showTradeWindow = true;

    // console.log(currentcoinObj, typeof this.price);
  }

  /////array for coins

  coinNames: string[] = [];

  pageIndex = 5;
  pageSize = 1;
  filterTerm!: string;

  public onClickLeft() {
    if (this.pageIndex >= 10) {
      this.pageIndex -= 5;
      this.pageSize--;
    }
  }
  public onClickRight() {
    if (this.pageIndex < 100) {
      this.pageIndex += 5;
      this.pageSize++;
    }
  }

  ngOnInit(): void {
    this.user$ = this.databaseService.user$;
    // this.coinPrice = this.databaseService.price;
    this.localId.next(this.tokenService.getUser().localId as string);

    if (this.user$.getValue().balance?.coinBase) {
      this.coinNames = Object.getOwnPropertyNames(
        this.user$.getValue().balance?.coinBase
      );
    }

    this.priceService.getCurrency().subscribe((v: any) => {
      this.coins = v;
    });

    this.registerValueChanges();

    this.balance = this.databaseService.balance;

    this.priceService.getCurrency().subscribe((v) => {
      this.allCoinsPrice = v;
    });
  }
}
