import { Component, OnInit, Inject } from '@angular/core';
import { NavigationStart, NavigationEnd, NavigationCancel, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModalLoginComponent } from '../modals/modalLogin/modalLogin.component';
import { ModalRegisterComponent } from './../modals/modalRegister/modalRegister.component';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {

  title = 'WORK BOARD';

  constructor(public dialog: MatDialog) { }

  openLogin(): void {
    this.dialog.open(ModalLoginComponent, { width: '320px' });
  }
  openRegister(): void {
    this.dialog.open(ModalRegisterComponent, { width: '320px' });
  }

  ngOnInit() {
    // this.openDialog();
  }

}
