import { Injectable } from "@angular/core";
import { Car } from "../models/car.model";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from "@angular/fire/database";

@Injectable({
  providedIn: "root"
})
export class AddCarService {
  public car: Car;
  carsRef: AngularFireList<any>;
  carRef: AngularFireObject<any>;
  constructor(private db: AngularFireDatabase) {}

  public AddCar(car: Car) {
    this.carsRef.push({
      marca: car.marca,
      id: car.id,
      model: car.model,
      km: car.km,
      descriere: car.descriere,
      categorie: car.categorie,
      pret: car.pret
    });
  }
}
