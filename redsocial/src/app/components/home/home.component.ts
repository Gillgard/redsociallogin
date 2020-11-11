import { Component, OnInit } from '@angular/core';
import { SignupService } from '../../services/signup.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  user = {
    usuario: '',
    password: ''
  };

  constructor(private signupService: SignupService, private router: Router) { }
  
  ngOnInit() {

  }

  LoguearUsuario(){
    this.signupService.signIn(this.user).subscribe(
      res => {
        console.log(res)
        localStorage.setItem('token', res.token);
        this.router.navigate(['wall']);
      },
      err => console.log(err)
    )
  }
}
  