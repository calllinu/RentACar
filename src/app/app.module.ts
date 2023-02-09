import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { AngularFireModule } from "@angular/fire";
import { environment } from "../environments/environment";
import { RouterModule } from "@angular/router";
import {
  AngularFirestoreModule,
  AngularFirestore
} from "@angular/fire/firestore";
import {
  AngularFireDatabaseModule,
  AngularFireDatabase
} from "@angular/fire/database";
import {
  AngularFireStorageModule,
  AngularFireStorage
} from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { appRoutes } from "./app.routes";
import { LoginComponent } from "./components/main-login/login/login.component";
import { SignUpComponent } from "./components/main-login/sign-up/sign-up.component";
import { ManageCarsComponent } from "./components/admin/manage-cars/manage-cars.component";
import { ManageUsersComponent } from "./components/admin/manage-users/manage-users.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { AddCarComponent } from "./components/admin/add-car/add-car.component";
import { CarDetailsComponent } from "./components/car-details/car-details.component";
import { MyCarsComponent } from "./components/my-cars/my-cars.component";
import { MyAccountComponent } from "./components/my-account/my-account.component";
import { HeaderBarComponent } from "./components/header-bar/header-bar.component";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { DashboardCarComponent } from "./components/dashboard/dashboard-car/dashboard-car.component";

import { MatButtonModule, MatCheckboxModule } from "@angular/material";
import { FormsModule } from "@angular/forms";
import {
  MatInputModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule
} from "@angular/material";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatRadioModule } from "@angular/material/radio";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material";
import "hammerjs";
import { EditCarComponent } from "./components/admin/edit-car/edit-car.component";
import { CarComponent } from "./components/my-cars/car/car.component";
import { FooterBarComponent } from "./components/footer-bar/footer-bar.component";
import { FilterPipe } from "./filter.pipe";
import { RecommendationsComponent } from "./components/car-details/recommendations/recommendations.component";
import { ReactiveFormsModule } from "@angular/forms";
import { FirebaseService } from "./services/firebase.service";
import { BorrowCarComponent } from "./components/admin/borrow-car/borrow-car.component";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";

import { MatDialogModule } from "@angular/material/dialog";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    ManageCarsComponent,
    ManageUsersComponent,
    DashboardComponent,
    AddCarComponent,
    CarDetailsComponent,
    MyCarsComponent,
    MyAccountComponent,
    HeaderBarComponent,
    DashboardCarComponent,
    EditCarComponent,
    CarComponent,
    FooterBarComponent,
    FilterPipe,
    RecommendationsComponent,
    BorrowCarComponent
  ],
  imports: [
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    FormsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    BrowserModule,
    AngularFirestoreModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireDatabaseModule,
    AngularFontAwesomeModule,
    MatAutocompleteModule,
    MatDialogModule,

    NgbModule,
    BsDropdownModule.forRoot()
    // AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
  ],
  providers: [
    MatNativeDateModule,
    FirebaseService,
    AngularFirestore,
    AngularFireStorage
  ],
  exports: [BsDropdownModule],

  bootstrap: [AppComponent]
})
export class AppModule {}
