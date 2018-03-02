import { PostService } from './../../_services/post.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostDetails } from '../../_services/post.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators/map';
import { MessageService, MessageDetails } from '../../_services/message.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {

  task: PostDetails;

  constructor(
    private postService: PostService,
    public messageSevice: MessageService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    let postId = '';

    if (this.route.snapshot.params['id']) {
      postId = this.route.snapshot.params['id'];
    }

    this.postService.getPost(postId, data => {
      this.task = data as PostDetails;
    });

    this.messageSevice.getMessages(postId);
  }

  ngOnDestroy() { }
}
