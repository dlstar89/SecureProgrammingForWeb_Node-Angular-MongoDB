import { AuthenticationService } from './../../_services/authentication.service';
import { buttonAnimation } from './../../_animations/angularAnimations';
import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';




@Component({
  selector: 'app-actionbutton',
  templateUrl: './actionbutton.component.html',
  styleUrls: ['./actionbutton.component.css'],
  animations: [buttonAnimation]
})
export class ActionbuttonComponent implements OnInit {

  @Output() notifyParent: EventEmitter<any> = new EventEmitter();


  constructor(public auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  sendNotification() {
    this.notifyParent.emit(this.router.url.split('/')[1]);
    // console.log(this.router.url.split('/'));
  }
}
