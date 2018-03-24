import { PostService, PostDetails } from './../../_services/post.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators/map';
import { MessageService, MessageDetails } from '../../_services/message.service';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {

  task: PostDetails;
  authorizedToMarkAnswers = false;

  constructor(
    private postService: PostService,
    public messageSevice: MessageService,
    private route: ActivatedRoute,
    private auth: AuthenticationService) { }

  ngOnInit() {
    let postId = '';

    if (this.route.snapshot.params['id']) {
      postId = this.route.snapshot.params['id'];
    }

    this.postService.getPost(postId, data => {
      this.task = data as PostDetails;
      this.authorizedToMarkAnswers = this.auth.isAuthorised(this.task.userId._id);
      this.messageSevice.getMessages(postId);
    });
  }

  updateMessageStatus(message: MessageDetails) {
    this.messageSevice.updateMessageStatus(message._id, !message.markedAsAnswer, this.auth.myToken, res => {
      const resMessage = res as MessageDetails;
      message.markedAsAnswer = resMessage.markedAsAnswer;
    });
  }

  ngOnDestroy() { }
}
