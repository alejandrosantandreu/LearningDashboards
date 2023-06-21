import { TestBed } from '@angular/core/testing';

import { GroupServiceService } from './group-service.service';
import { HttpClientModule } from '@angular/common/http';

describe('GroupServiceService', () => {
  let service: GroupServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [
      HttpClientModule
    ],});
    service = TestBed.inject(GroupServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
