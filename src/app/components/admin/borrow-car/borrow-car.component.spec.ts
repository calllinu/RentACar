import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BorrowCarComponent } from "./borrow-car.component";

describe("BorrowCarComponent", () => {
  let component: BorrowCarComponent;
  let fixture: ComponentFixture<BorrowCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BorrowCarComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
