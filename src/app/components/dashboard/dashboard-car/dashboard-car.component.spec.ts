import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DashboardCarComponent } from "./dashboard-car.component";

describe("DashboardCarComponent", () => {
  let component: DashboardCarComponent;
  let fixture: ComponentFixture<DashboardCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardCarComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
