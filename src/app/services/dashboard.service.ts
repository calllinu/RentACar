import { Car } from "src/app/models/car.model";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { HistoryEntry } from "../models/history.model";

@Injectable({
  providedIn: "root"
})
export class DashboardService {
  constructor(public db: AngularFireDatabase) {}

  carList: AngularFireList<any>;
  carHistoryList: AngularFireList<any>;
  historyKeyValue: { [key: string]: History } = {};

  getCars() {
    this.carList = this.db.list("/cars");
    return this.carList.snapshotChanges();
  }

  getCarsHistory() {
    this.carHistoryList = this.db.list("/history");
    return this.carHistoryList.valueChanges();
  }

  processCarsData(listOfCars): Car[] {
    const cars: Car[] = [];
    listOfCars.forEach(car => {
      const newCar = car.payload.val();
      newCar.key = car.key;
      cars.push(newCar);
    });
    return cars;
  }

  processHistoryData(listOfhistory): History[] {
    const history: History[] = [];
    listOfhistory.forEach(history => {
      const newhistory = history.payload.val();
      newhistory.key = history.key;
      this.historyKeyValue[history.key] = newhistory;
    });
    return history;
  }

  getCar(key) {
    return this.db.object("/cars/" + key).valueChanges();
  }
}
