import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
import {
  IPasswordsFormgroup,
  IRegisteredUser,
  IRegisterForm,
} from 'src/app/models/register.model';
import { DatabaseService } from 'src/app/services/database/database.service';
import { matchValidator } from 'src/app/validators/password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  showPassword = false;
  errorMessage$: BehaviorSubject<string> = new BehaviorSubject('');
  registerForm: FormGroup<IRegisterForm> = new FormGroup(
    {
      fullname: new FormGroup({
        firstname: new FormControl<string>('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
        lastname: new FormControl<string>('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
      }),
      email: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      passwords: new FormGroup<IPasswordsFormgroup>({
        password: new FormControl<string>('', {
          nonNullable: true,
          validators: [Validators.required, Validators.minLength(8)],
        }),
        confirmpassword: new FormControl<string>('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
      }),
    },
    [matchValidator('password', 'confirmpassword')]
  );

  constructor(private database: DatabaseService, private router: Router) {}

  ngOnInit(): void {}

  public onShowPassword(): void {
    this.showPassword = !this.showPassword;
    setTimeout(() => {
      this.showPassword = false;
    }, 4000);
  }

  public onSubmit(): void {
    if (!this.registerForm.valid) {
      return;
    }
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.passwords?.password;
    const userBody: IRegisteredUser = {
      email: email as string,
      fullname: this.registerForm.value.fullname as {
        firstname: string;
        lastname: string;
      },
      balance: 10000,
    };

    this.database
      .signUp(email as string, password as string, userBody)
      .pipe(
        tap((v) => this.registerForm.reset()),
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
