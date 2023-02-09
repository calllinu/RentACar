import { Component, OnInit } from "@angular/core";
import { DashboardService } from "src/app/services/dashboard.service";
import { Car } from "src/app/models/car.model";
import { ActivatedRoute, Router } from "@angular/router";
import { FirebaseService } from "src/app/services/firebase.service";
import { LoginService } from "src/app/services/login.service";

@Component({
  selector: "app-car-details",
  templateUrl: "./car-details.component.html",
  styleUrls: ["./car-details.component.css"]
})
export class CarDetailsComponent implements OnInit {
  constructor(
    public dashboardService: DashboardService,
    private firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) {}

  public carId;

  car: Car;

  descr = 1;
  key;
  user;

  ngOnInit() {
    this.key = this.route.snapshot.paramMap.get("id");

    this.dashboardService.getCar(this.key).subscribe(car => {
      this.car = car as Car;
    });

    this.loginService.loggedUser.subscribe(currentUser => {
      if (currentUser !== undefined) {
        if (currentUser === null) {
          this.router.navigate(["/login"]);
        } else {
          this.user = currentUser;
        }
      }
    });
  }

  borrowCar() {
    this.router.navigate(["/borrow-car/", this.key]);
  }

  returnCar() {
    const car = {
      is_borrowed: "false"
    };
    this.firebaseService.updateCar(this.key, car);
  }

  Change_to_rec() {
    if (this.descr === 1) {
      this.descr += 1;
    }
  }

  Change_to_desc() {
    if (this.descr === 2) {
      this.descr -= 1;
    }
  }

  editCar() {
    this.router.navigate(["/edit-car/", this.key]);
  }

  deleteCar() {
    this.firebaseService.deleteCar(this.key);
    this.router.navigate(["/dashboard"]);
  }
}
