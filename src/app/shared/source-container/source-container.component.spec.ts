import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceContainerComponent } from './source-container.component';

describe('SourceContainerComponent', () => {
  let component: SourceContainerComponent;
  let fixture: ComponentFixture<SourceContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
