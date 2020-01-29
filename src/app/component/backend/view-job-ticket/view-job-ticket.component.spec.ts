import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewJobTicketComponent } from './view-job-ticket.component';

describe('ViewJobTicketComponent', () => {
  let component: ViewJobTicketComponent;
  let fixture: ComponentFixture<ViewJobTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewJobTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewJobTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
