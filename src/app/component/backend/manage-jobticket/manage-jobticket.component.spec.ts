import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageJobticketComponent } from './manage-jobticket.component';

describe('ManageJobticketComponent', () => {
  let component: ManageJobticketComponent;
  let fixture: ComponentFixture<ManageJobticketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageJobticketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageJobticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
