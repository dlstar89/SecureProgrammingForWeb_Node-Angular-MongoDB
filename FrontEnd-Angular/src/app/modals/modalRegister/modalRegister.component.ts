import { Router } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { TokenPayload, AuthenticationService } from '../../_utils/authentication.service';

@Component({
  selector: 'app-modalregister',
  templateUrl: './modalRegister.component.html',
  styleUrls: ['./modalRegister.component.css']
})
export class ModalRegisterComponent implements OnInit {

  credentials: TokenPayload = {
    email: '',
    password: '',
    name: ''
  };

  constructor(
    public dialogRef: MatDialogRef<ModalRegisterComponent>,
    private auth: AuthenticationService,
    private router: Router) { }

    closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit(form) {
    console.log(form.value);
    this.auth.register(this.credentials).subscribe(() => {
      this.closeDialog();
      this.router.navigateByUrl('/profile');
    }, err => {
      console.log(err);
    });
  }

  ngOnInit() {
  }

}
