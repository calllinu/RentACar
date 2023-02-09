import { User } from 'src/app/models/user.model';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  loggedUserProfile: User;

  constructor( public loginService: LoginService ) { }

  ngOnInit() {
    this.loginService.loggedUser.subscribe(loggedUser => {
      this.loggedUserProfile = loggedUser;
    });
  }

  logOut() {
    this.loginService.logoutUser();
  }

}
