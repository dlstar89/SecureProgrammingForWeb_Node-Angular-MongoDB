import { AuthenticationService, TokenPayload } from './../../_utils/authentication.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modallogin',
  templateUrl: './modalLogin.component.html',
  styleUrls: ['./modalLogin.component.css'],
  providers: [AuthenticationService]
})
export class ModalLoginComponent implements OnInit {

  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  loginError;

  constructor(
    public dialogRef: MatDialogRef<ModalLoginComponent>,
    private auth: AuthenticationService,
    private router: Router) { }

  ngOnInit() { }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    console.log(this.credentials);
    this.auth.login(this.credentials).subscribe(() => {
      this.closeDialog();
      this.router.navigateByUrl('/profile');
    },
      err => {
        console.log(err);
        this.loginError = err.error;
      });
  }
}
