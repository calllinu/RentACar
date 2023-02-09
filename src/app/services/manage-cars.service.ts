import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { Car } from "../models/car.model";
import { HistoryEntry } from "../models/history.model";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ManageCarsService {
  cars: Subject<Car[]> = new Subject<Car[]>();
  carsByKey: Subject<any> = new Subject<any>();
  history: Subject<HistoryEntry[]> = new Subject<HistoryEntry[]>();
  carsKeyValue: { [key: string]: Car } = {};
  constructor(public db: AngularFireDatabase) {
    this.getCars();
    this.getHistory();
  }

  getCars() {
    this.db
      .list("/cars")
      .snapshotChanges()
      .subscribe(cars => {
        const carsWithKey = this.processCarsData(cars);
        this.cars.next(carsWithKey);
        this.carsByKey.next(this.carsKeyValue);
      });
  }

  getHistory() {
    this.db
      .list("/history")
      .valueChanges()
      .subscribe(entries => {
        this.history.next(entries as HistoryEntry[]);
      });
  }

  processCarsData(listOfCars): Car[] {
    const cars: Car[] = [];
    listOfCars.forEach(car => {
      const newCar = car.payload.val();
      newCar.key = car.key;
      cars.push(newCar);
      this.carsKeyValue[car.key] = newCar;
    });
    return cars;
  }

  getCarData(id: string) {
    this.db.list("/cars/id").valueChanges();
  }
}
