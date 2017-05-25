import { TestBed, inject } from '@angular/core/testing';

import { StuffService } from './stuff.service';

describe('StuffService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StuffService]
    });
  });

  it('should be created', inject([StuffService], (service: StuffService) => {
    expect(service).toBeTruthy();
  }));
});
