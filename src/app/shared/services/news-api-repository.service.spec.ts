import { TestBed } from '@angular/core/testing';

import { NewsApiRepositoryService } from './news-api-repository.service';
import { HttpClientModule } from '@angular/common/http';

describe('NewsApiRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: NewsApiRepositoryService = TestBed.get(NewsApiRepositoryService);
    expect(service).toBeTruthy();
  });
});
