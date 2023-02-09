import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  fullname: string;
  email: string;
  password: string;
  userCreatedSucess = 1;
  alertError = false;
  errMessage = '';
  succValue = false;
  ischecked = false;

  user;

  constructor(public loginservice: LoginService, 
    public afAuth: AngularFireAuth,  
    private router: Router,
    public loginService: LoginService) { 
  }

  ngOnInit() {
    this.loginService.loggedUser.subscribe(currentUser => {
      if (currentUser !== undefined) {
        if (currentUser !== null) {
          this.router.navigate(['/dashboard']);
        } 
      }
    });

     this.loadingPage();
    
  }

  

  loginUser() {
    this.checkedMethod();

    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
    .then(success => {
       this.router.navigate(['dashboard']);
     })
     .catch(error =>  {
      // Handle Errors here.
       this.alertError = true;
     });

  }
  onKeyEmail(event: any) { // without type info
    this.email = event.target.value;
    this.alertError = false;
    this.succValue = false;
  }

  onKeyPassword(event: any) { // without type info
    this.password = event.target.value;
    this.alertError = false;
    this.succValue = false;
  }

  checkRemeber(event: any) {
    if (event.target.checked !== this.ischecked) {
      this.ischecked = event.target.checked;
      this.checkedMethod();
    }
  }

  loadingPage() {
    if (localStorage.getItem('isChecked') === 'true') {
      this.email = localStorage.getItem('email');
      this.password = localStorage.getItem('password');
      this.ischecked = true;

      // console.log(window.localStorage.getItem('email'));
      // console.log(localStorage.getItem('password'));
      // console.log(localStorage.getItem('isChecked'));
    } else {
      this.ischecked = false;
    }
  }

  checkedMethod() {
    if (this.ischecked === true) {
       localStorage.setItem('email', this.email);
       localStorage.setItem('password', this.password);
       localStorage.setItem('isChecked', 'true');

      //  console.log(window.localStorage.getItem('email'));
      //  console.log(localStorage.getItem('password'));
      //  console.log(localStorage.getItem('isChecked'));
     } else {
      localStorage.setItem('isChecked', 'false');
      console.log(localStorage.getItem('isChecked'));
     }
  }
}
