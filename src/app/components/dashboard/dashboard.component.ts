import { Car } from "../../models/car.model";
import { DashboardService } from "./../../services/dashboard.service";
import { Component, OnInit, Input } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Router } from "@angular/router";
import { LoginService } from "src/app/services/login.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  constructor(
    private router: Router,
    public dashboardService: DashboardService,
    public loginService: LoginService
  ) {}

  cars: Car[];
  filteredCars: Car[];
  nr = 10;
  count = 0;
  user;

  ngOnInit() {
    this.loginService.loggedUser.subscribe(currentUser => {
      if (currentUser !== undefined) {
        if (currentUser === null) {
          this.router.navigate(["/login"]);
        } else {
          this.user = currentUser;
        }
      }
    });

    this.dashboardService.getCars().subscribe(list => {
      this.cars = this.dashboardService.processCarsData(list);
      this.filteredCars = this.cars;
      this.count = this.cars.length;
    });
  }

  filterCars(value: string) {
    this.filteredCars = this.cars.filter(
      car =>
        car.marca.toLowerCase().includes(value.toLowerCase()) ||
        car.model.toLowerCase().includes(value.toLowerCase())
    );

    if (this.filteredCars.length === 0) {
      this.filteredCars = [];
    }
  }

  loadMore() {
    this.nr += 10;
    if (this.nr > this.count) {
      this.count = this.nr;
    }
  }
}
