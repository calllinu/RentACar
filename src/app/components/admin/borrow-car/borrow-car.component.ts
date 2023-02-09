import { Component, OnInit, ViewChild } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { Car } from "src/app/models/car.model";
import { AddCarService } from "src/app/services/add-car.service";
import { HistoryEntry } from "src/app/models/history.model";
import { FormControl } from "@angular/forms";
import { FirebaseService } from "src/app/services/firebase.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ManageCarsService } from "src/app/services/manage-cars.service";
import { User } from "src/app/models/user.model";
import { LoginService } from "src/app/services/login.service";

// import { userInfo } from 'os';

@Component({
  selector: "app-borrow-car",
  templateUrl: "./borrow-car.component.html",
  styleUrls: ["./borrow-car.component.css"]
})
export class BorrowCarComponent implements OnInit {
  public addCarApi: AddCarService;
  carKey;
  @ViewChild("form") form;
  isBorrowed;
  marca = "";
  model = "";
  descriere = "";
  initialDate;
  dueDate;
  userKey;

  isSuccessful = false;
  history: HistoryEntry;
  user: User[];
  filteredUsers: User[];
  myControl = new FormControl();

  options = [];
  filteredOptions: User[] = [];
  usersList: AngularFireList<any>;

  public borrow: HistoryEntry;
  borrowcarForm: FormGroup;
  allCars: any;
  constructor(
    public db: AngularFireDatabase,
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
    public route: ActivatedRoute,
    public manageCarsService: ManageCarsService,
    private router: Router,
    private loginService: LoginService
  ) {
    this.borrowcarForm = this.fb.group({
      returnDate: this.fb.control("", Validators.required),
      dueDate: this.fb.control("", Validators.required),
      userKey: this.fb.control("", Validators.required),
      initialDate: this.fb.control("", Validators.required),
      carKey: this.fb.control("", Validators.required),
      marca: this.fb.control("", Validators.required),
      model: this.fb.control("", Validators.required),
      descriere: this.fb.control("", Validators.required)
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.carKey = params.get("id");

      this.firebaseService.getCarDetails(this.carKey).subscribe(item => {
        const car = item as Car;
        this.marca = car.marca;
        this.model = car.model;
        this.descriere = car.descriere;
        if (car.is_borrowed.toString() === "true") {
          this.isBorrowed = true;
        } else {
          this.isBorrowed = false;
        }
      });
    });

    this.getUsers().subscribe(list => {
      this.user = this.processUserData(list);
      this.filteredUsers = this.user;
      this.options = this.filteredUsers;
      this.filteredOptions = this.options;
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
  getOption(user) {
    this.userKey = user.key;
  }

  displayFn(user?: User): string | undefined {
    return user ? user.fullName : undefined;
  }

  public filter(event) {
    const filterValue = event.value.toLowerCase();
    this.filteredOptions = this.options.filter(
      option => option.fullName.toLowerCase().indexOf(filterValue) === 0
    );
  }

  dateToString(date) {
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    const year = date.getFullYear();
    month = month.length < 2 ? "0" + month : month;
    day = day.length < 2 ? "0" + day : day;
    return `${day}/${month}/${year}`;
  }

  onSubmit(value: History): void {
    const history = {
      carKey: this.carKey,
      initialDate: this.dateToString(this.initialDate),
      dueDate: this.dateToString(this.dueDate),
      returnDate: "",
      userKey: this.userKey
    };

    this.db
      .list("/history")
      .push(history)
      .then(result => {
        this.isSuccessful = true;
        this.showMessage();
      });

    const car = {
      is_borrowed: "true"
    };

    this.firebaseService.updateCar(this.carKey, car);
    this.router.navigate(["/dashboard"]);
  }

  showMessage() {
    if (this.isSuccessful === true) {
      setTimeout(() => {
        this.isSuccessful = false;
      }, 3000);
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
      users.push(newUser);
    });
    return users;
  }
  filterUser(value: string) {
    this.filteredUsers = this.user.filter(
      user =>
        user.email.toLowerCase().includes(value.toLowerCase()) ||
        user.fullName.toLowerCase().includes(value.toLowerCase())
    );
  }
}
