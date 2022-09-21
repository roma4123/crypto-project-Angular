import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  IPasswordsFormgroup,
  IRegisterForm,
} from 'src/app/models/register.model';
import { matchValidator } from 'src/app/validators/password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  showPassword = false;

  registerForm: FormGroup<IRegisterForm> = new FormGroup({
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
      }
      ),
      confirmpassword: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    }),
  },[matchValidator('password', 'confirmpassword')]
  );

  constructor() {}

  ngOnInit(): void {}

  public onShowPassword(): void{
    this.showPassword = !this.showPassword;
    setTimeout(() => {
      this.showPassword = false
    }, 4000);
  }
}
