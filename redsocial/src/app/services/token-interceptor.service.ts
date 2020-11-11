import { Injectable } from '@angular/core';
import { HttpInterceptor } from "@angular/common/http";
import { SignupService } from "../services/signup.service";
import { onErrorResumeNext } from 'rxjs';

const SECRET_KEY = 'secretkey';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  
  constructor( private signupService: SignupService) { }

  intercept(req, next){
    const tokenizeReq = req.clone({
      setHeaders: {
        authorization: `${SECRET_KEY} ${this.signupService.getToken()}`
      }
    })
    return next.handle(tokenizeReq);
  }

 
}
