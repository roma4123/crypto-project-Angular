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
