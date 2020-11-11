import { Component, OnInit } from '@angular/core';
import { SignupService } from '../../services/signup.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  providers: [ SignupService ]
})

export class SignupComponent implements OnInit {

  user = {
    f_name: '',
    l_name: '',
    user_pass: '',
    user_email: '',
    user_country: '',
    user_gender: '',
    user_birth: ''
  };

  constructor(private signupService: SignupService, private router: Router) { }

  ngOnInit() {
  
  }

  addUsuarios(){
    this.signupService.postUsuarios(this.user)
    .subscribe(res => {
      console.log(res);
      localStorage.setItem('token', res.token);
      this.router.navigate(['wall']);
    }, err => console.log(err)
    )
  }

}
