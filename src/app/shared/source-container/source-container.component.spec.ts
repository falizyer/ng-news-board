import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceContainerComponent } from './source-container.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('SourceContainerComponent', () => {
  let component: SourceContainerComponent;
  let fixture: ComponentFixture<SourceContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceContainerComponent ],
      imports: [RouterTestingModule]
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
