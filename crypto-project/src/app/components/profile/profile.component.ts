import { Component, OnInit } from '@angular/core';
import { IRegisteredUser } from 'src/app/models/register.model';
import { BehaviorSubject } from 'rxjs';
import { DatabaseService } from 'src/app/services/database/database.service';
import { TokenStorageService } from 'src/app/services/tokenStorage/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private databaseService: DatabaseService,
    private tokenService: TokenStorageService
  ) {}

  user$: BehaviorSubject<IRegisteredUser> = new BehaviorSubject(
    {} as IRegisteredUser
  );

  coinPrice!: number;
  localId: BehaviorSubject<string> = new BehaviorSubject('');

  ngOnInit(): void {
    this.user$ = this.databaseService.user$;
    this.coinPrice = this.databaseService.price;
    this.localId.next(this.tokenService.getUser().localId as string);
  }

  update() {
    // let changedUser = this.tokenService.getUser();
    // // changedUser.balance.balance = 99999 - this.coins.bitcoin;
    // this.tokenService.saveUser(changedUser);
    // this.user$.next(changedUser);
    // this.databaseService.updateBalance(
    //   this.localId.getValue(),
    //   this.tokenService.getUser()
    // );
  }
}
