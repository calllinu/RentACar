import { Component, OnInit, Input } from "@angular/core";
import { Car } from "src/app/models/car.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-car",
  templateUrl: "./car.component.html",
  styleUrls: ["./car.component.css"]
})
export class CarComponent implements OnInit {
  @Input() inputCar: Car;

  constructor(private router: Router) {}

  ngOnInit() {}

  onSelect() {
    this.router.navigate(["/car-details", this.inputCar.key]);
  }
}
