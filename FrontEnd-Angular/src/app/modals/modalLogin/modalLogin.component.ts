import { MessageUpdateStatus } from './../../_services/message.service';
import { environment } from './../../../environments/environment';
import { ISubscription } from 'rxjs/Subscription';
import { AuthenticationService, TokenPayload } from './../../_services/authentication.service';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormValidationsService } from '../../_utils/formValidations.service';
import { ErrorhandlerService } from '../../_services/errorhandler.service';

@Component({
  selector: 'app-modallogin',
  templateUrl: './modalLogin.component.html',
  styleUrls: ['./modalLogin.component.css'],
  providers: [AuthenticationService]
})
export class ModalLoginComponent implements OnInit, OnDestroy {

  credentials: TokenPayload = {
    email: '',
    password: '',
    reCaptcha: ''
  };

  form;

  private subscription$: ISubscription;

  invalidCredentialsError = false;
  serverUnreachableError = false;

  showError = false;
  errorMessage = '';

  constructor(
    private erh: ErrorhandlerService,
    private dialogRef: MatDialogRef<ModalLoginComponent>,
    private auth: AuthenticationService,
    private router: Router,
    private fb: FormBuilder,
    private fv: FormValidationsService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, this.fv.isEmailValid()]],
      password: ['', [Validators.required, this.fv.isPasswordValid()]],
      recaptcha: ['', Validators.required]
    });

    // setup test credentials when running on dev environment
    if (environment.production === false) {
      this.credentials.email = 'a@a.aa';
      this.credentials.password = 'Pass1234';
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
  }

  onSubmit() {
    this.subscription$ = this.auth.login(this.credentials).subscribe(() => {
      this.closeDialog();
      this.router.navigateByUrl('/profile');
    },
      err => {
        this.erh.logError(err);
        this.showError = true;

        switch (err.status) {
          case 401:
            this.errorMessage = 'Invalid Credentials, Please try again';
            break;
          case 0:
            this.errorMessage = 'Server is unreachable, Please try again later';
            break;
        }
      });
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}
