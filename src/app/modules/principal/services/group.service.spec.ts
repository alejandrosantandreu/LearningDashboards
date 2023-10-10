import { TestBed } from '@angular/core/testing';

import { GroupService } from './group.service';
import { HttpClientModule } from '@angular/common/http';

describe('GroupService', () => {
  let service: GroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [
      HttpClientModule,
    ]});
    service = TestBed.inject(GroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
