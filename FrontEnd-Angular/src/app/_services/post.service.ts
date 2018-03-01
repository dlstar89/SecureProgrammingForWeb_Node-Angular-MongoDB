import { PostDetails } from './post.service';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/toPromise';
import { AuthenticationService } from './authentication.service';

export interface PostDetails {
  _id: string;
  author: {
    _id: string;
    name: string;
  };
  title: string;
  shortDescription: string;
  fullDescription: string;
  totalMessages: number;
  postedOn: string;
}

export interface PostPayload {
  title: string;
  shortDescription: string;
  fullDescription: string;
}

@Injectable()
export class PostService {
  private BASE_URL = environment.apiUrl;
  private postSubject = new Subject();
  posts = this.postSubject.asObservable();
  postsArray: PostDetails[] = [];
  myPostsArray: PostDetails[] = [];

  constructor(private http: HttpClient, private auth: AuthenticationService) { }

  public getLatestPosts() {
    this.http
      .get(this.BASE_URL + '/getrecentposts')
      .subscribe(response => {
        this.postSubject.next(response);
      }, error => {
        console.error(error);
      });
  }

  public getLatestPostsObservable() {
    this.http.
      get(this.BASE_URL + '/getrecentposts')
      .subscribe(res => {
        this.postsArray = res as PostDetails[];
      }, err => {
        console.error(err);
      });
  }

  public getPost(id): Observable<any> {
    return this.http.
      get(
        this.BASE_URL + '/getpost',
        { headers: { postid: id } }
      );
  }

  public getUserPosts() {
    this.http.get(this.BASE_URL + '/getuserposts', { headers: { Authorization: `Bearer ${this.auth.myToken}` } }
    ).subscribe(data => {
      this.myPostsArray = data as PostDetails[];
    }, err => {
      console.log(err);
    });
  }

  public createPost(post: PostPayload, bearer: string, _suc?: Function, _err?: Function) {
    this.http.post(this.BASE_URL + '/createpost', post, { headers: { Authorization: `Bearer ${bearer}` } })
      .subscribe(
        res => {
          this.myPostsArray.unshift(res as PostDetails);
          _suc();
        },
        err => {
          console.error(err);
          _err();
        });
  }
}
