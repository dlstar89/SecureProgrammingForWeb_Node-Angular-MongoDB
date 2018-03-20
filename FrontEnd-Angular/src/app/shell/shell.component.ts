import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { trigger, transition } from '@angular/animations';
import { NavigationStart, NavigationEnd, NavigationCancel, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModalLoginComponent } from '../modals/modalLogin/modalLogin.component';
import { ModalRegisterComponent } from './../modals/modalRegister/modalRegister.component';
import { AuthenticationService } from '../_services/authentication.service';
import { routeAnimation, buttonAnimation } from '../_animations/angularAnimations';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [routeAnimation, buttonAnimation]
})
export class ShellComponent implements OnInit {

  title = 'WORK BOARD';

  modalConfig = { width: '320px', position: { top: '0px' } };

  constructor(
    public auth: AuthenticationService,
    public dialog: MatDialog
  ) { }

  ngOnInit() { }

  openLogin(): void {
    this.dialog.open(ModalLoginComponent, this.modalConfig);
  }

  openRegister(): void {
    this.dialog.open(ModalRegisterComponent, this.modalConfig);
  }

  logout() {
    this.auth.logout();
  }

  getNotification(evt) {
    // console.log(evt);
  }

  prepareRouteTransition(outlet) {
    const animation = outlet.activatedRouteData['animation'] || {};
    return animation['value'] || null;
  }
}
