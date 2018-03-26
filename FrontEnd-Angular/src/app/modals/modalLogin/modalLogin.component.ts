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
    password: ''
  };

  form;

  private subscription$: ISubscription;

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
      password: ['', [Validators.required, this.fv.isPasswordValid()]]
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.subscription$ = this.auth.login(this.credentials).subscribe(() => {
      this.closeDialog();
      this.router.navigateByUrl('/profile');
    },
      err => {
        console.error(err);
        this.erh.handleError('INVALID CREDENTIALS', 'CLOSE');
      });
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}
