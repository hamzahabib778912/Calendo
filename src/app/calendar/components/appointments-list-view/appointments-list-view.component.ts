import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable } from 'rxjs';
import { Appointment } from 'src/app/interfaces/appointment';
import { AppointmentTable } from 'src/app/interfaces/appointmentTable';
import { ManageDateService } from 'src/app/services/saving-date-service.service';

@Component({
  selector: 'app-appointments-list-view',
  templateUrl: './appointments-list-view.component.html',
  styleUrls: ['./appointments-list-view.component.scss']
})
export class AppointmentsListViewComponent implements OnInit {
  @Output() closeDialog = new EventEmitter<void>();
  appointments$!: Observable<Appointment[]>;
  selectedDate: any;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private savingDataService: ManageDateService,) {
  this.selectedDate  = this.data.selectedDate

  }

  ngOnInit(): void {
    this.appointments$ = this.savingDataService.getAppointmentsForDate(this.data.selectedDate);
  }

  onClose(): void {
    this.closeDialog.emit();  // Emit an event to close the dialog
  }

  private loadAppointments(selectedDate: Date): void {
    // Normalize the selected date to remove the time part
    const normalizedSelectedDate = new Date(selectedDate.setHours(0, 0, 0, 0));

    this.appointments$ = this.savingDataService.getAllAppointments().pipe(
      map(appointments => {
        return appointments.filter(appointment => {
          // Normalize the appointment date to remove the time part
          const normalizedAppointmentDate = new Date(appointment.Date.setHours(0, 0, 0, 0));

          // Compare only the date parts
          return normalizedAppointmentDate.getTime() === normalizedSelectedDate.getTime();
        });
      })
    );
  }
}
