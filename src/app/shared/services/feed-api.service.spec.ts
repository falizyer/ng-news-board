import { TestBed } from '@angular/core/testing';

import { FeedApiService } from './feed-api.service';

describe('FeedApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FeedApiService = TestBed.get(FeedApiService);
    expect(service).toBeTruthy();
  });
});
