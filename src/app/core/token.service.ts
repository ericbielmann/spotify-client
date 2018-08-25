import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class TokenService {

  private code: string;
  private accessToken: string;
  private refreshToken: string;
  private client_id = '44352ea60e344eb4b595ffa032e1325f';
  private client_secret = '2097f12fa0344ab1b95b25a230c671ae';
  private encoded = btoa(this.client_id + ':' + this.client_secret);
  private redirect_uri = 'http%3A%2F%2Flocalhost%3A4200%2Fcallback';

  constructor(private http: Http, private http2: HttpClient, private router: Router) { }

  login() {
    let route = `https://accounts.spotify.com/authorize/?client_id=${this.client_id}&response_type=code&redirect_uri=${this.redirect_uri}&scope=user-read-private%20user-read-email%20playlist-modify-public%20playlist-modify-private&show_dialog=true`;
    // this.router.navigate(['/']).then(result => { window.location.href = 'https://accounts.spotify.com/authorize/?client_id=44352ea60e344eb4b595ffa032e1325f&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fcallback&scope=user-read-private%20user-read-email%20playlist-modify-public%20playlist-modify-private&show_dialog=true'; });
    window.location.href = route;
  }

  saveCode(code: string) {
    this.code = code;
    return this.getToken(code);
  }

  getToken(code) {
    const headers = new Headers();
    headers.append(`Authorization`, `Basic ${this.encoded}`);
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append(`Content-Type`, `application/x-www-form-urlencoded`);
    const params = `grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:4200/callback`;
    this.http
      .post('https://accounts.spotify.com/api/token', params, { headers })
      .map((data: Response) => data.json())
      .subscribe(res => {
        return this.saveTokens(res.access_token, res.refresh_token);
      });
  }

  saveTokens(access_token: string, refresh_token: string) {
    this.accessToken = access_token;
    this.refreshToken = refresh_token;
    localStorage.setItem('accessToken', this.accessToken);
    localStorage.setItem('refreshToken', this.refreshToken);
  }

  returnToken() {
    return localStorage.getItem('accessToken');
  }

}