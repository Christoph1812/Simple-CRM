import { TestBed } from '@angular/core/testing';

import { firebaseData } from './firebaseData.service';

describe('AddfirebaseData', () => {
  let service: firebaseData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(firebaseData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
