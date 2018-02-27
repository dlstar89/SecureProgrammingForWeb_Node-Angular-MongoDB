import { PostService } from './../../_services/post.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostDetails } from '../../_services/post.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators/map';
import { MessageService } from '../../_services/message.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {

  task: PostDetails;

  messages = [];

  constructor(
    private postService: PostService,
    public messageSevice: MessageService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const postId = this.route.snapshot.params['id'];

    this.postService.getPost(postId).subscribe(data => {
      this.task = data;
    });

    this.messageSevice.getMessages(postId);

    // console.log(postId);
  }

  ngOnDestroy(): void {

  }

}
