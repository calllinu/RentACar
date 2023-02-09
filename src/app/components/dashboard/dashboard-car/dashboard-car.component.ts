import { Car } from "../../../models/car.model";
import { Component, OnInit, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { DashboardService } from "src/app/services/dashboard.service";
import { ManageCarsService } from "src/app/services/manage-cars.service";
import { AngularFireDatabase } from "@angular/fire/database";
import { HistoryEntry } from "src/app/models/history.model";
import { User } from "firebase";
import { LoginService } from "src/app/services/login.service";

@Component({
  selector: "app-dashboard-car",
  templateUrl: "./dashboard-car.component.html",
  styleUrls: ["./dashboard-car.component.css"]
})
export class DashboardCarComponent implements OnInit {
  @Input() inputCar: Car;
  @Input() user: User;
  carsHistory: History[];
  cars: Car[];
  dueDate;

  constructor(
    private router: Router,
    public dashboardService: DashboardService,
    private route: ActivatedRoute,
    public carManagerService: ManageCarsService,
    private db: AngularFireDatabase,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.db
      .list("/history")
      .valueChanges()
      .subscribe(entries => {
        const histories = entries.filter(
          element => this.inputCar.key === (element as HistoryEntry).carKey
        );
        if (histories.length > 0) {
          this.dueDate = (histories[
            histories.length - 1
          ] as HistoryEntry).dueDate;
        }
      });
  }

  onSelect() {
    this.router.navigate(["/car-details/", this.inputCar.key]);
  }

  onSelectBorrow() {
    this.router.navigate(["/borrow-car/", this.inputCar.key]);
  }
}
