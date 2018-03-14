import { AuthenticationService } from './../../_services/authentication.service';
import { ModalNewMessageComponent } from './../../modals/modalNewMessage/modalNewMessage.component';
import { buttonAnimation } from './../../_animations/angularAnimations';
import { Component, OnInit, Output } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { ModalNewPostComponent } from '../../modals/modalNewPost/modalNewPost.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-actionbutton',
  templateUrl: './actionbutton.component.html',
  styleUrls: ['./actionbutton.component.css'],
  animations: [buttonAnimation]
})
export class ActionbuttonComponent implements OnInit {

  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  modalConfig = { width: '99%', position: { top: '0px' } };
  display = false;
  currentLocation = '';
  locations = {
    profile: 'profile',
    post: 'post'
  };

  constructor(
    private router: Router,
    public auth: AuthenticationService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.router.events.subscribe(r => {
      if (r instanceof NavigationEnd) {
        this.currentLocation = this.router.url.split('/')[1];
        switch (this.currentLocation) {
          case this.locations[this.currentLocation]:
            this.display = true;
            break;
          default:
            this.display = false;
            break;
        }
      }
    });
  }


  sendNotification() {
    switch (this.currentLocation) {
      case this.locations.profile:
        this.dialog.open(ModalNewPostComponent, this.modalConfig);
        break;
      case this.locations.post:
        this.dialog.open(ModalNewMessageComponent, this.modalConfig);
        break;
      default:
        break;
    }

    this.notifyParent.emit(this.router.url.split('/')[1]);
  }
}
