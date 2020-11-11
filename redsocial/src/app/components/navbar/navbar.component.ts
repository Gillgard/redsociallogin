import { Component, OnInit } from '@angular/core';
import { SignupService } from '../../services/signup.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  constructor( public signupService: SignupService ) { }

  ngOnInit() {
  }

}
