import { Router } from '@angular/router';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
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

  private subscription: ISubscription;

  constructor(
    public dialogRef: MatDialogRef<ModalRegisterComponent>,
    private auth: AuthenticationService,
    private router: Router) { }

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

  ngOnInit() {

  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
