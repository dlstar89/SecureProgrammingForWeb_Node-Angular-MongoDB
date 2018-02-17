import { AuthenticationService } from './../../_services/authentication.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserDetails } from '../../_services/authentication.service';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  details: UserDetails;
  private subscription: ISubscription;

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.subscription = this.auth.profile().subscribe(user => {
      if (user) {
        this.details = user;
      } else {
        this.auth.logout();
      }
    }, (err) => {
      console.error(err);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
