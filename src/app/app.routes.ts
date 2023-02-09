import { MyCarsComponent } from "./components/my-cars/my-cars.component";

import { Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LoginComponent } from "./components/main-login/login/login.component";
import { CarDetailsComponent } from "./components/car-details/car-details.component";
import { AddCarComponent } from "./components/admin/add-car/add-car.component";
import { ManageCarsComponent } from "./components/admin/manage-cars/manage-cars.component";
import { SignUpComponent } from "./components/main-login/sign-up/sign-up.component";
import { EditCarComponent } from "./components/admin/edit-car/edit-car.component";
import { BorrowCarComponent } from "./components/admin/borrow-car/borrow-car.component";
import { ManageUsersComponent } from "./components/admin/manage-users/manage-users.component";
import { MyAccountComponent } from "./components/my-account/my-account.component";

export const appRoutes: Routes = [
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "car-details/:id", component: CarDetailsComponent },
  { path: "add-car", component: AddCarComponent },
  { path: "edit-car", component: EditCarComponent },
  { path: "my-cars", component: MyCarsComponent },
  { path: "manage-users", component: ManageUsersComponent },
  { path: "edit-car/:id", component: EditCarComponent },
  { path: "borrow-car/:id", component: BorrowCarComponent },
  { path: "manage-cars", component: ManageCarsComponent },
  { path: "my-account", component: MyAccountComponent },
  { path: "signup", component: SignUpComponent }
];
