import { TestBed } from '@angular/core/testing';

import { LogGardService } from './log-gard.service';

describe('LogGardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogGardService = TestBed.get(LogGardService);
    expect(service).toBeTruthy();
  });
});
