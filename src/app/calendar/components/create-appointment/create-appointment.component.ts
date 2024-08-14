import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManageDateService } from 'src/app/services/saving-date-service.service';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.scss']
})
export class CreateAppointmentComponent {
  appointmentForm: FormGroup;
  data: any;
  isFromRow!: boolean;

  constructor(
    private fb: FormBuilder,
    private savingDateService: ManageDateService,
    public dialogRef: MatDialogRef<CreateAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {
    this.data = dialogData;
    this.isFromRow = !!dialogData.hour;
    this.appointmentForm = this.fb.group({
      Title: ['', Validators.required],
      Duration: [0, Validators.required],
      Description: [''],
      Time: [{ value: this.isFromRow ? dialogData.hour : '', disabled: this.isFromRow }, Validators.required]
    });
  }

  ngOnInit() {
    if (this.data.hour) {
      this.appointmentForm.patchValue({
        Time: this.data.hour // Initialize time field if hour is provided
      });
    }
  }

  InsertAppointment() {
    const appointment = this.appointmentForm.value;
    const date = this.dialogData.date;
    const hour = this.dialogData.hour;
    const fullDate = new Date(date);

    if (!this.isFromRow) {
      // If opened from add button, handle the time value safely
      const timeValue = appointment.Time || '';
      const [hourValue, period] = timeValue.split(' ');
      if (hourValue && period) {
        fullDate.setHours(period === 'PM' ? parseInt(hourValue) + 12 : parseInt(hourValue));
      }
    } else {
      // If opened from row, use the hour from dialogData
      const [hourValue, period] = hour.split(' ');
      fullDate.setHours(period === 'PM' ? parseInt(hourValue) + 12 : parseInt(hourValue));
    }
    fullDate.setMinutes(0, 0, 0);
    // Save the appointment in the service
    this.savingDateService.saveDate(date.toISOString() + (appointment.Time || hour), {
      ...appointment,
      Date: fullDate
    });

    this.dialogRef.close();
  }
}
