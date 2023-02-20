import { TestBed } from '@angular/core/testing';

import { ApiTeamsService } from './api-teams.service';

describe('ApiTeamsService', () => {
  let service: ApiTeamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiTeamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
