import { PostService, PostDetails } from './../../_services/post.service';
import { AuthenticationService } from './../../_services/authentication.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserDetails } from '../../_services/authentication.service';
import { ISubscription } from 'rxjs/Subscription';
import { cardFadeIn } from '../../_animations/angularAnimations';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [cardFadeIn]
})
export class ProfileComponent implements OnInit, OnDestroy {

  details: UserDetails;
  private subscriptionUser$: ISubscription;

  constructor(private auth: AuthenticationService, public posts: PostService) { }

  ngOnInit() {
    this.subscriptionUser$ = this.auth.profile().subscribe(user => {
      if (user) {
        this.details = user;
      } else {
        this.auth.logout();
      }
    }, (err) => {
      console.error(err);
    });

    this.posts.getMyPosts();
  }

  ngOnDestroy() {
    this.subscriptionUser$.unsubscribe();
  }
}
