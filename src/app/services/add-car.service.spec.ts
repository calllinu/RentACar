import { TestBed } from "@angular/core/testing";

import { AddCarService } from "./add-car.service";

describe("AddCarService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: AddCarService = TestBed.get(AddCarService);
    expect(service).toBeTruthy();
  });
});
