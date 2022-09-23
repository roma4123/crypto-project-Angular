import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import {
  IPasswordsFormgroup,
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

  public onSubmit() {
    this.database
      .saveUser2(this.registerForm.value as unknown as IRegisterForm)
      .pipe(
        tap((user) => {
          console.log(this.registerForm.value);
          // this.registerForm.reset();
          this.router.navigate(['/signin']);
        }),
        catchError((err) => {
          return of(0);
        })
      )
      .subscribe();
  }
}
