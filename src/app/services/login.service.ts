import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, Subject } from "rxjs";
import { AngularFireDatabase } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { Router } from "@angular/router";
import { User } from "../models/user.model";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  loggedUserEmail;
  public users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  public usersByKey: Subject<any> = new Subject<any>();
  usersKeyValue: { [key: string]: User } = {};
  public loggedUser: BehaviorSubject<User> = new BehaviorSubject<User>(
    undefined
  );

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public db: AngularFireDatabase
  ) {
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.loggedUserEmail = user.email;
        this.getAllUsers();
      } else {
        this.users.next([]);
        this.loggedUser.next(null);
      }
    });
  }

  signInWithEmailAndPassword(email: string, pass: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, pass);
  }

  createUserWithEmailAndPassword(email: string, pass: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, pass);
  }

  logoutUser() {
    this.afAuth.auth
      .signOut()
      .then(logout => {
        this.router.navigate(["login"]);
      })
      .catch(error => {
        alert("An error happened could not log out! " + error);
      });
  }

  private getAllUsers() {
    this.db
      .list("/users")
      .snapshotChanges()
      .subscribe(entries => {
        const users: User[] = [];
        entries.forEach(entry => {
          const newUser = entry.payload.val() as User;
          newUser.key = entry.key;
          users.push(newUser);
          this.usersKeyValue[entry.key] = newUser;
        });
        this.users.next(users);
        this.usersByKey.next(this.usersKeyValue);
        this.loggedUser.next(
          users.find(user => user.email === this.loggedUserEmail)
        );
      });
  }
}
