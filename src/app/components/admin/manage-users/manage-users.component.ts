import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user.model";
import { AngularFireList, AngularFireDatabase } from "@angular/fire/database";
import { FirebaseService } from "src/app/services/firebase.service";
import { Router } from "@angular/router";
import { LoginService } from "src/app/services/login.service";

@Component({
  selector: "app-manage-users",
  templateUrl: "./manage-users.component.html",
  styleUrls: ["./manage-users.component.css"]
})
export class ManageUsersComponent implements OnInit {
  filteredUsers: User[];
  usersList: AngularFireList<any>;
  users: User[];
  filteredOptions: string[] = [];
  lungime: number;
  userKey: string;
  constructor(
    public db: AngularFireDatabase,
    private router: Router,
    public loginService: LoginService
  ) {}

  ngOnInit() {
    this.getUsers().subscribe(list => {
      this.users = this.processUserData(list);
      this.filteredUsers = this.users;
      this.lungime = this.users.length;
    });

    this.loginService.loggedUser.subscribe(currentUser => {
      if (currentUser !== undefined) {
        if (currentUser === null) {
          this.router.navigate(["/login"]);
        }
        if (currentUser.userRole !== "admin") {
          this.router.navigate(["/dashboard"]);
        }
      }
    });
  }

  filterUsers(value: string) {
    this.filteredUsers = this.users.filter(
      car =>
        car.fullName.toLowerCase().includes(value.toLowerCase()) ||
        car.email.toLowerCase().includes(value.toLowerCase()) ||
        car.userRole.toLowerCase().includes(value.toLowerCase())
    );

    if (this.filteredUsers.length === 0) {
      this.filteredUsers = [];
    }
  }

  getUsers() {
    this.usersList = this.db.list("/users");
    return this.usersList.snapshotChanges();
  }

  processUserData(listOfUsers): User[] {
    const users: User[] = [];
    listOfUsers.forEach(user => {
      const newUser = user.payload.val();
      newUser.key = user.key;
      this.userKey = user.key;
      users.push(newUser);
    });
    return users;
  }

  makeAdmin() {
    const user = {
      userRole: "admin"
    };
    this.updateUser(this.userKey, user);
  }

  updateUser(id, userDetails) {
    return this.db.list("/users").update(id, userDetails);
  }
  regularUser() {
    const user = {
      userRole: "user"
    };
    this.updateUser(this.userKey, user);
  }

  deletUser() {
    const id = this.userKey;
    return this.db.list("/users").remove(id);
  }

  setKey(key) {
    this.userKey = key;
  }
}
