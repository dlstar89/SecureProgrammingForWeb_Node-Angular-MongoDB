import { PostDetails } from './post.service';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/toPromise';

export interface PostDetails {
  _id: string;
  author: {
    _id: string;
    name: string;
  };
  title: string;
  description: string;
  postedOn: string;
}

@Injectable()
export class PostService {
  private BASE_URL = environment.apiUrl;
  private postSubject = new Subject();
  posts = this.postSubject.asObservable();
  postsArray: any = [];

  constructor(private http: HttpClient) { }

  public getLatestPosts() {
    // const request = this.http.get(`{$this.BASE_URL}/getrecentposts`)
    this.http.get(this.BASE_URL + '/getrecentposts')
      .subscribe(response => {
        this.postSubject.next(response);
      }, error => {
        console.error(error);
      });
  }

  public getLatestPostsObservable() {
    this.http.get(this.BASE_URL + '/getrecentposts').subscribe(res => {
      this.postsArray = res;
    }, err => {
      console.error(err);
    });
  }

}
