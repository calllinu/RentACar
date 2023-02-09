import { Component, OnInit, ViewChild } from "@angular/core";
import { Car } from "src/app/models/car.model";
import { FormControl } from "@angular/forms";
import { AngularFireDatabase } from "@angular/fire/database";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgModule } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AddCarService } from "src/app/services/add-car.service";
import { Router } from "@angular/router";
import { finalize } from "rxjs/operators";
import { AngularFireStorage } from "angularfire2/storage";
import { LoginService } from "src/app/services/login.service";

@Component({
  selector: "app-add-car",
  templateUrl: "./add-car.component.html",
  styleUrls: ["./add-car.component.css"]
})
export class AddCarComponent implements OnInit {
  public addCarApi: AddCarService;
  @ViewChild("form") form;
  public car: Car;
  addCarForm: FormGroup;
  allCars: any;
  isSucceful = false;

  marca = "";
  model = "";
  km = "";
  descriere = "";
  categorie = "";
  tag = "";
  pret = "";
  is_borrowed = "false";

  url = "/assets/img/car_cover.png";
  ref: any;
  task: any;
  downloadURL: any;

  constructor(
    public db: AngularFireDatabase,
    private afStorage: AngularFireStorage,
    private fb: FormBuilder,
    private router: Router,
    public loginService: LoginService
  ) {
    this.addCarForm = this.fb.group({
      id: this.fb.control(""),
      marca: this.fb.control("", Validators.required),
      model: this.fb.control("", Validators.required),
      km: this.fb.control("", Validators.required),
      descriere: this.fb.control("", Validators.required),
      categorie: this.fb.control("", Validators.required),
      tag: this.fb.control(""),
      pret: this.fb.control("", Validators.required)
    });
  }

  ngOnInit() {
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

  onSubmit(value: Car): void {
    const car = {
      marca: this.marca,
      model: this.model,
      km: this.km,
      descriere: this.descriere,
      picture: this.url,
      is_borrowed: "false",
      categorie: this.categorie,
      pret: this.pret
    };

    this.db
      .list("/cars")
      .push(car)
      .then(result => {
        this.isSucceful = true;
        this.showMessage();
        this.form.resetForm();
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
    this.router.navigate(["/dashboard"]);
  }

  upload(event) {
    const randomId = this.marca + "_" + this.model + "_" + this.km;
    this.ref = this.afStorage.ref("/cars/" + randomId);
    this.task = this.ref.put(event.target.files[0]);

    this.task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.ref.getDownloadURL().subscribe(url => {
            this.url = url;
          });
        })
      )
      .subscribe();
  }
}
