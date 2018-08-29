import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient
} from '@angular/common/http';
import { Http } from '@angular/http';
import { TokenService } from './token.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public tokenService: TokenService, private http: Http) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token
    this.http.get('http://localhost:3232/get_token').subscribe((res: any) => {
      console.log('success', res)
      token = res.accesToken
    },
  err => {
    console.log('error', err)
  });
    request = request.clone({
      setHeaders: {
        // Authorization: `Bearer ${token}`
        Authorization: `Bearer ${this.tokenService.returnToken()}`
      }
    });
    return next.handle(request);
  }
}