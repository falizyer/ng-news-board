import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { random } from 'faker';

import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { FeedApiService } from '../shared/services/feed-api.service';
import { NewsBoard } from '../index';
import { NewsApiRepositoryService } from '../shared/services/news-api-repository.service';
import { Observable, of } from 'rxjs';
import { FilterPipe } from '../shared/pipes/filter.pipe';
import { HttpClientModule } from '@angular/common/http';

describe('DashboardComponent', () => {
  let sourceList: NewsBoard.SourceItemObject[];
  let source: NewsBoard.SourceItemObject;
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let feedApiServiceStub: Partial<FeedApiService>;
  let newsApiRepositoryServiceStub: Partial<NewsApiRepositoryService>;

  beforeEach(async(() => {
    source = {
      id: 'id',
      name: 'name',
      description: 'description',
      url: 'url',
      category: 'category',
      language: 'language',
      country: 'country'
    };
    newsApiRepositoryServiceStub = {
      getSources(properties: any = {}): Observable<any> {
        return of({
          sources: []
        });
      }
    };
    feedApiServiceStub = {
      isExists(source: NewsBoard.SourceItemObject): boolean {
        return sourceList.indexOf(source) > -1;
      },
      addFeed(source: NewsBoard.SourceItemObject): void {
        sourceList.push(source);
      },
      removeFeed(source: NewsBoard.SourceItemObject): void {
        sourceList = sourceList.filter(datum => datum.id !== source.id);
      }
    };
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        FilterPipe
      ],
      imports: [
        SharedModule,
        HttpClientModule
      ],
      providers: [
        { provide: FeedApiService, useValue: feedApiServiceStub },
        { provide: NewsApiRepositoryService, useValue: newsApiRepositoryServiceStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    sourceList = [];
    // router = fixture.debugElement.injector.get<ActivatedRoute>(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('paginationRoute should return a string value', () => {
    const index: number = random.number();
    expect(component.paginationRoute(index)).toEqual(`/dashboard/${index}`);
  });

  it('onSubscribe should add source', () => {
    sourceList = [];
    component.onSubscribe(source);
    expect(sourceList).toEqual([source]);
  });

  it('onSubscribe should remove source', () => {
    sourceList = [source];
    component.onSubscribe(source);
    expect(sourceList).toEqual([]);
  });
});
