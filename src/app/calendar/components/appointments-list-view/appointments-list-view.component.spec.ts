import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsListViewComponent } from './appointments-list-view.component';

describe('AppointmentsListViewComponent', () => {
  let component: AppointmentsListViewComponent;
  let fixture: ComponentFixture<AppointmentsListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentsListViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentsListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
