import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class SignupService {

  readonly URL_API = 'http://localhost:3000/api/usuarios';

  constructor(private http: HttpClient, private router: Router) {
  }

  getUsuarios() {
    return this.http.get(this.URL_API);
  }

  postUsuarios(user) {
    return this.http.post<any>(this.URL_API + '/signup', user);
  }

  signIn(user) {
    return this.http.post<any>(this.URL_API + '/signin', user);
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['home'])
  }

}
