import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { Observable, Subject, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { tap, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorServiceService implements HttpInterceptor{

  constructor(private router: Router, private _auth: AuthService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log("intercept is called.", request)
    if (request.url.includes('/register')) {
      console.log("register is found in url.")
      // No need to send authen if user needs to register.
      if (!request.headers.has('Content-Type')) {
        request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
      }
      return next.handle(request);
    }
    // if (!request.headers.has('Content-Type')) {
    //   request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    // }
    let token = this._auth.getToken();
    try{
      if (token == null) {
        token = window.btoa(request.body.username + ':' + request.body.password);
      }
    }catch{
      console.log("no username and password are filled.")
    }
    console.log("show me token --> ", token)
    /*request = request.clone({ headers: request.headers.set('Accept', 'application/json') }).clone({
      setHeaders: {
        // Authorization: `Bearer ${this._auth.getToken()}`
        Authorization: `Basic ${token}`
      }
    });*/
    const modified_req = request.clone({ 
      headers: request.headers.set('Authorization', `Basic ${token}`),
    });
    console.log("request return --> ", modified_req)
    return next.handle(modified_req)
  }
}
