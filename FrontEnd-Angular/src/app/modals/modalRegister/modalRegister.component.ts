import { FormValidationsService } from './../../_utils/formValidations.service';
import { Router } from '@angular/router';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TokenPayload, AuthenticationService } from '../../_services/authentication.service';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-modalregister',
  templateUrl: './modalRegister.component.html',
  styleUrls: ['./modalRegister.component.css']
})
export class ModalRegisterComponent implements OnInit, OnDestroy {

  credentials: TokenPayload = {
    email: '',
    password: '',
    name: ''
  };

  form;

  private subscription: ISubscription;

  constructor(
    public dialogRef: MatDialogRef<ModalRegisterComponent>,
    private auth: AuthenticationService,
    private router: Router,
    private fb: FormBuilder,
    private fv: FormValidationsService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required, this.fv.isNameValid()]],
      email: ['', [Validators.required, this.fv.isEmailValid()]],
      password: ['', [Validators.required, this.fv.isPasswordValid()]],
      passwordRepeat: ['', [Validators.required, this.fv.isPasswordValid()]],
    },
      { validator: this.fv.fieldsMatch('password', 'passwordRepeat') }
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit(form) {
    this.subscription = this.auth.register(this.credentials).subscribe(() => {
      this.closeDialog();
      this.router.navigateByUrl('/profile');
    }, err => {
      console.log(err);
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
