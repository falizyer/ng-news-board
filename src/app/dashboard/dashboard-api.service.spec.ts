import { TestBed } from '@angular/core/testing';

import { DashboardApiService } from './dashboard-api.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('DashboardApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      SharedModule,
      ReactiveFormsModule,
      FormsModule
    ]
  }));

  it('should be created', () => {
    const service: DashboardApiService = TestBed.get(DashboardApiService);
    expect(service).toBeTruthy();
  });
});
