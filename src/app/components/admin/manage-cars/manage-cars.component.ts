import { Component, OnInit } from "@angular/core";
import { ManageCarsService } from "src/app/services/manage-cars.service";
import { HistoryEntry } from "src/app/models/history.model";
import { Car, CarHistory } from "src/app/models/car.model";
import { LoginService } from "src/app/services/login.service";
import { AngularFireDatabase } from "@angular/fire/database";
import { Router } from "@angular/router";

@Component({
  selector: "app-manage-cars",
  templateUrl: "./manage-cars.component.html",
  styleUrls: ["./manage-cars.component.css"]
})
export class ManageCarsComponent implements OnInit {
  carsHistory: HistoryEntry[];
  allCarsByKey: Car[];
  overdueCars = [];
  borrowedCars = [];
  allUsersByKey = {};
  history: History[];
  constructor(
    private router: Router,
    public carManagerService: ManageCarsService,
    public loginService: LoginService,
    public db: AngularFireDatabase
  ) {}

  ngOnInit() {
    this.loginService.usersByKey.subscribe(usersByKey => {
      this.allUsersByKey = usersByKey;
      this.getCarsHistory();
    });
    this.carManagerService.carsByKey.subscribe(cars => {
      this.allCarsByKey = cars;
    });
    this.carManagerService.history.subscribe(history => {
      this.carsHistory = history;
      this.getCarsHistory();
    });
  }

  getCarsHistory() {
    if (
      !this.carsHistory ||
      !this.carsHistory.length ||
      !Object.entries(this.allUsersByKey).length
    ) {
      return;
    }
    this.overdueCars = [];
    this.borrowedCars = [];

    const borrowedCars = this.carsHistory.filter(car => !car.returnDate);
    borrowedCars.forEach(entry => {
      const car: CarHistory = this.allCarsByKey[entry.carKey];
      if (car) {
        car.dueDate = entry.dueDate;
        car.initialDate = entry.initialDate;
        car.returnDate = entry.returnDate;

        if (entry.userKey && this.allUsersByKey[entry.userKey]) {
          car.userFullName = this.allUsersByKey[entry.userKey].fullName;
        } else {
          car.userFullName = "User key missing in db";
        }

        const todayDate = this.getTodayDate();
        if (this.getDateFromString(car.dueDate) >= todayDate) {
          this.borrowedCars.push(car);
        } else {
          this.overdueCars.push(car);
        }
      }
    });
  }

  getDateFromString(date) {
    const from = date.split("/");
    return new Date(from[2], from[1] - 1, from[0]);
  }

  getTodayDate() {
    const q = new Date();
    const m = q.getMonth();
    const d = q.getDate();
    const y = q.getFullYear();
    return new Date(y, m, d);
  }

  dateToString(date) {
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    const year = date.getFullYear();
    month = month.length < 2 ? "0" + month : month;
    day = day.length < 2 ? "0" + day : day;
    return `${day}/${month}/${year}`;
  }

  goToDetails(carKey) {
    this.router.navigate(["/car-details/" + carKey]);
  }

  goTo() {
    this.router.navigate(["/add-car"]);
  }
}
