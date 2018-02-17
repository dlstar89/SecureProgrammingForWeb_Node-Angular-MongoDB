import { Injectable } from '@angular/core';

@Injectable()
export class FormValidationsService {

  constructor() { }

  public isEmailValid() {
    return (control) => {
      if (control.touched || control.dirty) {
        // tslint:disable-next-line:max-line-length
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(control.value) ? null : { invalidEmail: true };
      }
    };
  }

  public isPasswordValid() {
    return (control) => {
      if (control.touched || control.dirty) {
        return control.value.length >= 4 ? null : { valid: true };
      }
    };
  }

  public isNameValid() {
    return (control) => {
      if (control.touched || control.dirty) {
        const conVal = control.value.trim();
        return conVal.length >= 1 ? null : { valid: true };
      }
    };
  }

  public fieldsMatch(field1, field2) {
    return (control) => {
      if (control.controls[field1].touched && control.controls[field2].touched
        || control.controls[field1].dirty && control.controls[field2].dirty) {
        return control.controls[field1].value === control.controls[field2].value ? null : { passwordMatch: true };
      }
    };
  }
}
