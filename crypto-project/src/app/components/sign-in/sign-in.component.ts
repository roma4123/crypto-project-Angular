import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
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
        tap((v) => console.log(v)),
        catchError((e) => {
          console.log(e);
          return of(null);
        })
      )
      .subscribe({
        next: (v) => {
          this.router.navigateByUrl('/profile');
        },
      });
  }
}
