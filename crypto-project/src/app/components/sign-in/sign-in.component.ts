import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, catchError, of} from 'rxjs';
import { ISigninform } from 'src/app/models/register.model';
import { DatabaseService } from 'src/app/services/database/database.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signinform: FormGroup<ISigninform> = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)],
    }),
  });

  constructor(
    private databaseService: DatabaseService,

  ) {}

  errorMessage$: BehaviorSubject<string> = new BehaviorSubject('');

  ngOnInit(): void {

  }

  public logIn(): void {
    let email = this.signinform.value.email;
    let password = this.signinform.value.password;
    this.signinform.reset();
    this.databaseService
      .login(email as string, password as string)
      .pipe(
        catchError((e) => {
          console.log(e);
          this.errorMessage$.next(e.error.error.message);
          setTimeout(() => {
            this.errorMessage$.next('');
          }, 3000);
          return of(null);
        })
      )
      .subscribe();
  }
}
