import { PostService } from './../../_services/post.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostDetails } from '../../_services/post.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators/map';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {

  task: PostDetails;

  constructor(private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit() {
    const postId = this.route.snapshot.params['id'];

    this.postService.getPost(postId).subscribe(data => {
      this.task = data;
    });

    // console.log(postId);
  }

  ngOnDestroy(): void {

  }

}
