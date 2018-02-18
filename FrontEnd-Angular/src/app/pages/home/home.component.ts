import { Component, OnInit } from '@angular/core';
import { PostService } from '../../_services/post.service';
import { cardFadeIn } from '../../_animations/angularAnimations';
import { trigger, transition, query, animate, style, stagger } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [cardFadeIn]
})
export class HomeComponent implements OnInit {

  constructor(public postService: PostService) { }

  ngOnInit() {
    this.postService.getLatestPostsObservable();
  }
}
