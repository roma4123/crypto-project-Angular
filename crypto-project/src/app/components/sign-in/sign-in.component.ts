import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
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
    private router: Router
  ) {}

  errorMessage$: BehaviorSubject<string> = new BehaviorSubject('');

  ngOnInit(): void {
    // this.databaseService.getUsers().subscribe((v) => console.log(v));
  }

  public logIn(): void {
    let email = this.signinform.value.email;
    let password = this.signinform.value.password;
    this.signinform.reset();
    this.databaseService
      .login(email as string, password as string)
      .pipe(
        tap((v) => {
          console.log(v);
          this.router.navigateByUrl('/profile');
        }),
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
