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

  public passwordValid() {
    return (control) => {
      if (control.touched || control.dirty) {
        return control.value.length > 4 ? null : { valid: true };
      }
    };
  }

  public fieldsMatch(field1, field2) {
    return field1 === field2 ? null : { valid: true };
  }
}
