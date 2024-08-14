import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { CreateAppointmentComponent } from './components/create-appointment/create-appointment.component';
import { VisualizeAppointmentComponent } from './components/visualize-appointment/visualize-appointment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { AppointmentsListViewComponent } from './components/appointments-list-view/appointments-list-view.component';

@NgModule({
  declarations: [
    CalendarComponent,
    CreateAppointmentComponent,
    VisualizeAppointmentComponent,
    AppointmentsListViewComponent
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    MatCardModule,
    MatTableModule,
    MatDatepickerModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    DragDropModule,
    MatIconModule
  ]
})
export class CalendarModule { }
