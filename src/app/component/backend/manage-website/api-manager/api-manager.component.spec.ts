import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiManagerComponent } from './api-manager.component';

describe('ApiManagerComponent', () => {
  let component: ApiManagerComponent;
  let fixture: ComponentFixture<ApiManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
