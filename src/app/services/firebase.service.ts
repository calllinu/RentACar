import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList
} from "@angular/fire/database";
import { Car } from "src/app/models/car.model";
import { ConditionalExpr } from "@angular/compiler";

@Injectable({
  providedIn: "root"
})
export class FirebaseService {
  constructor(public db: AngularFireDatabase) {}

  getCarDetails(key) {
    return this.db.object("/cars/" + key).valueChanges();
  }

  updateCar(id, carDetails) {
    return this.db.list("/cars").update(id, carDetails);
  }

  deleteCar(key) {
    return this.db.list("/cars/" + key).remove();
  }
}
