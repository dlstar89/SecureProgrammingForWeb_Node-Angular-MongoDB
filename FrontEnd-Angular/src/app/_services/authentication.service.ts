import { Authorisation } from './authentication.service';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';


/**INTERFACES */
export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  auth: [Authorisation];
  exp: number;
  iat: number;
}

export interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
  name?: string;
}

export interface Authorisation {
  _id: string;
  authName: string;
  authLevel: number;
}

@Injectable()
export class AuthenticationService {

  private BASE_URL = environment.apiUrl;
  private TOKEN_KEY = 'token';

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  private saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private getToken(): string {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  get myToken(): string {
    return this.getToken();
  }

  public logout(): void {
    window.localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigateByUrl('/');
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    if (token) {
      return JSON.parse(window.atob(token.split('.')[1]));
    } else {
      return null;
    }
  }

  public get getUserID(): string {
    const user = this.getUserDetails();
    if (user) {
      return user._id;
    } else {
      return null;
    }
  }

  /**
   * Compares user ids to see if the action is authorised
   *
   * @param {string} _id
   * @returns {boolean}
   * @memberof AuthenticationService
   */
  public isAuthorised(_id: string): boolean {
    if (_id === this.getUserID) {
      return true;
    }

    if (this.isAdmin === true) {
      return true;
    }

    return false;
  }

  private get isAdmin(): boolean {
    const user = this.getUserDetails();
    if (user && user.auth) {
      return user.auth.filter(a => a.authLevel === 777).length > 0;
    }

    return false;
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private request(method: 'post' | 'get', type: 'login' | 'register' | 'profile' | 'users', user?: TokenPayload): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.http.post(`${this.BASE_URL}/${type}`, user);
    } else {
      base = this.http.get(`${this.BASE_URL}/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` } });
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data) {
          if (data['token']) {
            this.saveToken(data.token);
          }
          return data;
        }
        return null;
      })
    );

    return request;
  }

  public register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
  }

  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }

  public profile(): Observable<any> {
    return this.request('get', 'profile');
  }

  public users(): Observable<any> {
    return this.request('get', 'users');
  }

  public handleError(message: string, action: string, duration?: number) {
    this.snackBar.open(message, action, {
      duration: duration || 2000,
    });
  }
}
