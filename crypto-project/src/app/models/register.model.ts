import { FormControl, FormGroup } from '@angular/forms';

export interface IFullnameFormgroup {
  firstname: FormControl<string>;
  lastname: FormControl<string>;
}

export interface IPasswordsFormgroup {
  password: FormControl<string>;
  confirmpassword: FormControl<string>;
}

export interface IRegisterForm {
  fullname: FormGroup<IFullnameFormgroup>;
  email: FormControl<string>;
  passwords: FormGroup<IPasswordsFormgroup>;
}

export interface ISigninform {
  email: FormControl<string>;
  password: FormControl<string>;
}

export interface IAuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refereshToken: string;
  expaiersIn: string;
  localId: string;
  registered?: boolean;
}

export interface ISigninUser {
  email: string;
  password: string;
}

export interface IRegisteredUser {
  email: string;
  fullname: {
    firstname: string;
    lastname: string;
  };
  balance: number;
  localId?: string;
}
