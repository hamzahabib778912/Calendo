import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { AppointmentTable } from 'src/app/interfaces/appointmentTable';
import { ManageDateService } from 'src/app/services/saving-date-service.service';
import { CreateAppointmentComponent } from '../create-appointment/create-appointment.component';
import { VisualizeAppointmentComponent } from '../visualize-appointment/visualize-appointment.component';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { map } from 'rxjs';
import { AppointmentsListViewComponent } from '../appointments-list-view/appointments-list-view.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<any>;
  selectedDate: Date | undefined;
  dataSource: AppointmentTable[] = [
    {Hour: "12 AM", Appointment: {Title: '', Date: new Date, Duration: 0, Description: ''}},
    {Hour: "1 AM", Appointment: {Title: '', Date: new Date, Duration: 0, Description: ''}},
    {Hour: "2 AM", Appointment: {Title: '', Date: new Date, Duration: 0, Description: ''}},
    {Hour: "3 AM", Appointment: {Title: '', Date: new Date, Duration: 0, Description: ''}},
    {Hour: "4 AM", Appointment: {Title: '', Date: new Date, Duration: 0, Description: ''}},
    {Hour: "5 AM", Appointment: {Title: '', Date: new Date, Duration: 0, Description: ''}},
    {Hour: "6 AM", Appointment: {Title: '', Date: new Date, Duration: 0, Description: ''}},
    {Hour: "7 AM", Appointment: {Title: '', Date: new Date, Duration: 0, Description: ''}},
    {Hour: "8 AM", Appointment: {Title: '', Date: new Date, Duration: 0, Description: ''}},
    {Hour: "9 AM", Appointment: {Title: '', Date: new Date, Duration: 0, Description: ''}},
    {Hour: "10 AM", Appointment: {Title: '', Date: new Date, Duration: 0, Description: ''}},
    {Hour: "11 AM", Appointment: {Title: '', Date: new Date, Duration: 0, Description: ''}},
    {Hour: "12 PM", Appointment: {Title: '', Date: new Date, Duration: 0, Description: ''}},
    {Hour: "1 PM", Appointment: {Title: '', Date: new Date, Duration: 0, Description: ''}},
    {Hour: "2 PM", Appointment: {Title: '', Date: new Date, Duration: 0, Description: ''}},
    {Hour: "3 PM", Appointment: {Title: '', Date: new Date, Duration: 0, Description: ''}},
    {Hour: "4 PM", Appointment: {Title: '', Date: new Date, Duration: 0, Description: ''}},
    {Hour: "5 PM", Appointment: {Title: '', Date: new Date, Duration: 0, Description: ''}},
    {Hour: "6 PM", Appointment: {Title: '', Date: new Date, Duration: 0, Description: ''}},
    {Hour: "7 PM", Appointment: {Title: '', Date: new Date, Duration: 0, Description: ''}},
    {Hour: "8 PM", Appointment: {Title: '', Date: new Date, Duration: 0, Description: ''}},
    {Hour: "9 PM", Appointment: {Title: '', Date: new Date, Duration: 0, Description: ''}},
    {Hour: "10 PM", Appointment: {Title: '', Date: new Date, Duration: 0, Description: ''}},
    {Hour: "11 PM", Appointment: {Title: '', Date: new Date, Duration: 0, Description: ''}}
  ];
  columns = [
    {
      columnDef: 'hour',
      header: 'Hour',
      cell: (element: AppointmentTable) => `${element.Hour}`,
    },
    {
      columnDef: 'appointment',
      header: 'Appointment',
      cellContent: (element: AppointmentTable) => `${element.Appointment.Title}`,
      cellHour: (element: AppointmentTable) => `${element.Hour}`
    }
  ];
  displayedColumns = this.columns.map(c => c.columnDef);

  constructor(private dateManager: ManageDateService,
              private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.selectedDate = new Date(); // Set the selected date to the current date
    this.updateView();
  }

  updateView() {
    if (!this.selectedDate) return;

    // Fetch appointments from the service
    this.dateManager.appointments$.pipe(
      map(appointmentsMap => {
        // Populate the dataSource with existing appointments from the service
        return this.dataSource.map(element => {
          const storedAppointment = appointmentsMap.get(`${this.selectedDate?.toISOString()}${element.Hour}`);
          return {
            ...element,
            Appointment: storedAppointment || { Title: '', Date: new Date(), Duration: 0, Description: '' }
          };
        });
      })
    ).subscribe(updatedDataSource => {
      this.dataSource = updatedDataSource;
      // Notify Angular that the data source has changed
      this.table.renderRows();
    });
  }


drag(event: CdkDragDrop<AppointmentTable[]>) {
    const previousIndex = event.previousIndex;
    const currentIndex = event.currentIndex;

    if (previousIndex < 0 || previousIndex >= this.dataSource.length || currentIndex < 0 || currentIndex >= this.dataSource.length) {
      console.error('Invalid indices');
      return;
    }

    const movedAppointment = this.dataSource[previousIndex].Appointment;
    const newHour = this.dataSource[currentIndex].Hour;

    // Debugging: Log the moved appointment
    console.log('Moved Appointment:', movedAppointment);

    // Ensure movedAppointment is not empty
    if (!movedAppointment || !movedAppointment.Title) {
      console.error('Moved appointment is empty or invalid:', movedAppointment);
      return;
    }

    // Update the appointment's date based on the new hour
    const [hourValue, period] = newHour.split(' ');
    movedAppointment.Date = new Date(movedAppointment.Date);
    movedAppointment.Date.setHours(period === 'PM' ? parseInt(hourValue) + 12 : parseInt(hourValue));

    // Remove old appointment data and save new one
    const oldDateKey = `${this.selectedDate?.toISOString()}${this.dataSource[previousIndex].Hour}`;
    const newDateKey = `${this.selectedDate?.toISOString()}${newHour}`;

    this.dateManager.removeDate(oldDateKey);
    this.dateManager.saveDate(newDateKey, movedAppointment);

    // Update data source
    this.dataSource[previousIndex] = {
      Hour: this.dataSource[previousIndex].Hour,
      Appointment: { Title: '', Date: new Date(), Duration: 0, Description: '' }
    };
    this.dataSource[currentIndex] = {
      Hour: newHour,
      Appointment: movedAppointment
    };

    // Refresh table
    this.updateView();
  }

  openDialogCreate(app?: any) {
    const dialogRef = this.dialog.open(CreateAppointmentComponent, {
      data: {
        date: this.selectedDate,
        hour: app
      },
      width: "750px",
      height: "auto",
      enterAnimationDuration:"500ms",
      exitAnimationDuration: "500ms"
    });

    dialogRef.afterClosed().subscribe(() => {
      this.updateView()
    });
  }
  viewAppointment(app: any) {
    const selectedDateStr = this.selectedDate?.toISOString(); // Convert selectedDate to ISO string
    const dateKey = `${selectedDateStr}${app}`;

    const dialogRef = this.dialog.open(VisualizeAppointmentComponent, {
      data: {
        date: dateKey, // Pass the formatted date key
        hour: app
      },
      enterAnimationDuration:"500ms",
      exitAnimationDuration: "500ms"
    });

    dialogRef.afterClosed().subscribe(() => {
      this.updateView();
    });
  }

  openAppointmentsPopup() {
    const dialogRef =  this.dialog.open(AppointmentsListViewComponent, {
      data: { selectedDate: this.selectedDate },
      width: '600px',
      height: 'auto'
    });

    dialogRef.componentInstance.closeDialog.subscribe(() => {
      dialogRef.close();  // Close the dialog when the close button is clicked
    });
  }

}
