import { Component, OnInit, ApplicationModule } from "@angular/core";
import { AddCarService } from "src/app/services/add-car.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from "@angular/fire/database";
import { Car } from "src/app/models/car.model";
import { ActivatedRoute, Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import { FirebaseService } from "src/app/services/firebase.service";
import { CarDetailsComponent } from "../../car-details/car-details.component";
import { Title } from "@angular/platform-browser";
import { database } from "firebase";
import { LoginService } from "src/app/services/login.service";

@Component({
  selector: "app-edit-car",
  templateUrl: "./edit-car.component.html",
  styleUrls: ["./edit-car.component.css"]
})
export class EditCarComponent implements OnInit {
  carList: Car[];
  carKey;
  id: number;
  marca: string;
  model: string;
  descriere: string;
  km: string;
  categorie: string;
  tag: string;
  image: string;
  isBorrowed: boolean;
  pret: number;
  addCarForm: FormGroup;
  car: Car;

  isSucceful = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firebaseService: FirebaseService,
    private fb: FormBuilder,
    private loginService: LoginService
  ) {
    this.addCarForm = this.fb.group({
      id: this.fb.control(""),
      marca: this.fb.control("", Validators.required),
      model: this.fb.control("", Validators.required),
      km: this.fb.control("", Validators.required),
      descriere: this.fb.control("", Validators.required),
      categorie: this.fb.control("", Validators.required),
      tag: this.fb.control(""),
      isBorrowed: this.fb.control(false, Validators.required),
      image: this.fb.control(""),
      pret: this.fb.control("", Validators.required)
    });
    {
    }
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.carKey = params.get("id");
      this.firebaseService.getCarDetails(this.carKey).subscribe(item => {
        const car = item as Car;
        this.marca = car.marca;
        this.model = car.model;
        this.descriere = car.descriere;
        this.km = car.km;
        this.pret = car.pret;
        this.categorie = car.categorie;
        this.isBorrowed = car.is_borrowed;
      });
    });
    this.loginService.loggedUser.subscribe(currentUser => {
      if (currentUser !== undefined) {
        if (currentUser === null) {
          this.router.navigate(["/login"]);
        }
        if (currentUser.userRole !== "admin") {
          this.router.navigate(["/dashboard"]);
        }
      }
    });
  }

  submitEdit() {
    const car = {
      marca: this.marca,
      model: this.model,
      descriere: this.descriere,
      km: this.km,
      categorie: this.categorie,
      is_borrowed: this.isBorrowed,
      pret: this.pret
    };

    this.firebaseService.updateCar(this.carKey, car).then(result => {
      this.isSucceful = true;
      this.showMessage();
    });
  }

  showMessage() {
    if (this.isSucceful === true) {
      setTimeout(() => {
        this.isSucceful = false;
      }, 3000);
    }
  }

  redirect() {
    this.router.navigate(["/car-details/", this.carKey]);
  }
}
