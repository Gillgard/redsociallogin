import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { SignupService } from './services/signup.service'
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private signupService: SignupService, private router: Router ){ }
  
  canActivate(): boolean{
    if(this.signupService.loggedIn()){
      return true;
    }
    this.router.navigate(['home']);
    return false;
  }

  
    
}
