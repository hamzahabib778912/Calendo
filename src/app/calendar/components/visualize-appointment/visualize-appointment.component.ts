import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appointment } from 'src/app/interfaces/appointment';
import { ManageDateService } from 'src/app/services/saving-date-service.service';

@Component({
  selector: 'app-visualize-appointment',
  templateUrl: './visualize-appointment.component.html',
  styleUrls: ['./visualize-appointment.component.scss']
})
export class VisualizeAppointmentComponent implements OnInit {
  selectedAppointment!: Appointment;
  endTime!: Date;
  hour!: string;

  constructor(private savingDataService: ManageDateService,
              @Inject(MAT_DIALOG_DATA) private _data: any
  ) { }

  ngOnInit(): void {
    this.selectedAppointment = JSON.parse(this.savingDataService.getDate(this._data.date)!);
    this.selectedAppointment.Date = new Date(this.selectedAppointment.Date);
    this.endTime = new Date(this.selectedAppointment.Date);
    this.endTime = new Date(this.endTime.setMinutes(this.selectedAppointment.Date.getMinutes() + this.selectedAppointment.Duration));
    this.hour = this._data.hour.split(" ")[1];
  }

  DeleteAppointment() {
    this.savingDataService.removeDate(this._data.date);
  }
}
