import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private database: DatabaseService) {}

  ngOnInit(): void {
    this.database.getUsers().subscribe((v) => console.log(v));
  }

  public logIn() {
    // this.database.saveUser(this.signinform.value as unknown as ISigninform);
    // .subscribe((v) => console.log(this.signinform.value));
  }
}
