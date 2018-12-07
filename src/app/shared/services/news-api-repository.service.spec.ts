import { TestBed } from '@angular/core/testing';

import { NewsApiRepositoryService } from './news-api-repository.service';

describe('NewsApiRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewsApiRepositoryService = TestBed.get(NewsApiRepositoryService);
    expect(service).toBeTruthy();
  });
});
