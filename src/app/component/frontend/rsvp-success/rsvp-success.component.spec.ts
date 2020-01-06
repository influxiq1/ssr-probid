import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RsvpSuccessComponent } from './rsvp-success.component';

describe('RsvpSuccessComponent', () => {
  let component: RsvpSuccessComponent;
  let fixture: ComponentFixture<RsvpSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RsvpSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RsvpSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
