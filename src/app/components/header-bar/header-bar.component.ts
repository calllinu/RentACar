import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent implements OnInit {

  loggedUser: User;
  constructor(public loginService: LoginService) { }

  ngOnInit() {
    this.loginService.loggedUser.subscribe(user => {
      this.loggedUser = user;
    });
  }

  logOut() {
    this.loginService.logoutUser();
  }

}
