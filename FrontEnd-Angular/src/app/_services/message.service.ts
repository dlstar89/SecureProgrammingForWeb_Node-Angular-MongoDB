import { MessageDetails } from './message.service';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostDetails } from './post.service';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';

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

export interface MessageUpdateStatus {
  _id: string;
  answeredStatus: boolean;
}

@Injectable()
export class MessageService {
  private BASE_URL = environment.apiUrl;
  messageArray: MessageDetails[] = [];

  constructor(private http: HttpClient) { }

  public getMessages(postid) {
    this.http
      .get(this.BASE_URL + '/getrecentmessages', { headers: { postid: postid } })
      .subscribe(data => {
        this.messageArray = data as MessageDetails[];
      }, err => {
        console.error(err);
      });
  }

  public postMessage(messageText: string, postId: string, bearer: string, sucFun: Function) {
    this.http
      .post(this.BASE_URL + '/postmessage',
        { postId: postId, messageText: messageText },
        { headers: { Authorization: `Bearer ${bearer}` } })
      .subscribe(res => {
        this.messageArray.push(res as MessageDetails);
        sucFun();
      }, err => {
        console.error(err);
      });
  }

  public updateMessageStatus(messageId: string, markedAsAnswer: boolean, bearer: string, sucFun: Function) {
    this.http
      .put(this.BASE_URL + '/markAnsweredStatus',
        { messageId: messageId, markedAsAnswer: markedAsAnswer },
        { headers: { Authorization: `Bearer ${bearer}` } })
      .subscribe(res => {
        sucFun(res as MessageDetails);
      }, err => {
        console.error(err);
      });
  }
}
