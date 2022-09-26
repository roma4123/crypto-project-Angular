import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { DatabaseService } from 'src/app/services/database/database.service';
import { TokenStorageService } from 'src/app/services/tokenStorage/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  scroll() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  public logOut(): void {
    this.tokenService.logOut();
    window.location.reload();
  }

  isLogged$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private tokenService: TokenStorageService,
    private router: Router,
    private database: DatabaseService
  ) {}
  ngOnInit(): void {
    this.isLogged$ = this.database.isLogged$;
  }
}
