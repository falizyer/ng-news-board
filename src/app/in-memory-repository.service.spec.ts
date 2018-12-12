import { TestBed } from '@angular/core/testing';

import { InMemoryRepositoryService } from './in-memory-repository.service';

describe('InMemoryRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InMemoryRepositoryService = TestBed.get(InMemoryRepositoryService);
    expect(service).toBeTruthy();
  });
});
