import { TestBed } from '@angular/core/testing';

import { NbaAPIService } from './nba-api.service';

describe('NbaAPIService', () => {
  let service: NbaAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NbaAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
