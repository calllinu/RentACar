import { TestBed } from "@angular/core/testing";

import { ManageCarsService } from "./manage-cars.service";

describe("ManageCarsService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: ManageCarsService = TestBed.get(ManageCarsService);
    expect(service).toBeTruthy();
  });
});
