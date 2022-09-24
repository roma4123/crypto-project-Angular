import { Component, OnInit } from '@angular/core';
import { IRegisteredUser } from 'src/app/models/register.model';
import { BehaviorSubject } from 'rxjs';
import { DatabaseService } from 'src/app/services/database/database.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private databaseService: DatabaseService) {}

  user$: BehaviorSubject<IRegisteredUser> = new BehaviorSubject(
    {} as IRegisteredUser
  );

  ngOnInit(): void {
    this.user$ = this.databaseService.user$;
    console.log(this.user$.getValue());
  }
}
