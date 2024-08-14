import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizeAppointmentComponent } from './visualize-appointment.component';

describe('VisualizeAppointmentComponent', () => {
  let component: VisualizeAppointmentComponent;
  let fixture: ComponentFixture<VisualizeAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizeAppointmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizeAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
