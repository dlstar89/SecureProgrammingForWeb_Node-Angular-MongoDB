import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostDetails } from './post.service';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';
import { AuthenticationService } from './authentication.service';

export interface MessageDetails {
  _id: string;
  userId: {
    _id: string;
    name: string;
  };
  postId: {
    _id: string;
  };
  messageText: string;
  markedAsAnswer: boolean;
  postedOn: string;
}

@Injectable()
export class MessageService {
  private BASE_URL = environment.apiUrl;
  messageArray: MessageDetails[] = [];

  constructor(private http: HttpClient, private auth: AuthenticationService) { }

  public getMessages(postid): Observable<any> {
    return this.http.get(this.BASE_URL + '/getrecentmessages', { headers: { postid: postid } });
  }

  // public getLatestPostsObservable() {
  //   this.http.
  //     get(this.BASE_URL + '/getrecentposts')
  //     .subscribe(res => {
  //       this.postsArray = res;
  //     }, err => {
  //       console.error(err);
  //     });
  // }

  public getMessage(id): Observable<any> {
    return this.http.get(this.BASE_URL + '/getpost', { headers: { postid: id } });
  }


  // public getMyPosts(): Observable<any> {
  //   return this.http.
  //     get(
  //       this.BASE_URL + '/getmyposts',
  //       { headers: { Authorization: `Bearer ${this.auth.myToken}` } }
  //     );
  // }

}
