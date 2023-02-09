import { Component, OnInit } from "@angular/core";
import { Car } from "src/app/models/car.model";
import { ManageCarsService } from "src/app/services/manage-cars.service";
import { HistoryEntry } from "src/app/models/history.model";
import { LoginService } from "src/app/services/login.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-my-cars",
  templateUrl: "./my-cars.component.html",
  styleUrls: ["./my-cars.component.css"]
})
export class MyCarsComponent implements OnInit {
  allCarsByKey: Car[];
  carsHistory: HistoryEntry[];
  nr = 10;
  user;
  cars: Car[] = [];

  constructor(
    private router: Router,
    public carManagerService: ManageCarsService,
    public loginService: LoginService
  ) {}

  ngOnInit() {
    this.carManagerService.carsByKey.subscribe(cars => {
      this.allCarsByKey = cars;
      this.getCarsHistory();
    });
    this.carManagerService.history.subscribe(history => {
      this.carsHistory = history;
      this.getCarsHistory();
    });
    this.loginService.loggedUser.subscribe(currentUser => {
      if (currentUser !== undefined) {
        if (currentUser === null) {
          this.router.navigate(["/login"]);
        } else {
          this.user = currentUser;
        }
      }
      this.getCarsHistory();
    });
  }

  getCarsHistory() {
    if (!this.carsHistory || !this.carsHistory.length || !this.user) {
      return;
    }

    const myCars = this.carsHistory.filter(
      car => car.userKey === this.user.key && car.returnDate == ""
    );

    myCars.forEach(entry => {
      const car: Car = this.allCarsByKey[entry.carKey];
      this.cars.push(car);
    });
  }

  loadMore() {
    this.nr += 10;
  }
}
