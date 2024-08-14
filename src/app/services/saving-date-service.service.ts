import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Appointment } from '../interfaces/appointment';

@Injectable({
  providedIn: 'root'
})
export class ManageDateService {

  private appointmentsSubject = new BehaviorSubject<Map<string, Appointment>>(new Map());
  public appointments$ = this.appointmentsSubject.asObservable();

  constructor() { }

  public saveDate(key: string, value: Appointment) {
    const currentAppointments = this.appointmentsSubject.getValue();
    currentAppointments.set(key, value);
    this.appointmentsSubject.next(new Map(currentAppointments));
  }

  public getDate(key: string) :any {
    const currentAppointments = this.appointmentsSubject.getValue();
    return currentAppointments.get(key);
  }

  public removeDate(key: string) {
    const currentAppointments = this.appointmentsSubject.getValue();
    currentAppointments.delete(key);
    this.appointmentsSubject.next(new Map(currentAppointments));
  }

  public clearDate() {
    this.appointmentsSubject.next(new Map());
  }

  public getAllAppointments(): Observable<Appointment[]> {
    return this.appointments$.pipe(
      map(appointmentsMap => Array.from(appointmentsMap.values()))
    );
  }

  public getAppointmentsForDate(date: Date): Observable<Appointment[]> {
    const normalizedSelectedDate = new Date(date.setHours(0, 0, 0, 0));

    return this.appointments$.pipe(
      map(appointmentsMap => {
        return Array.from(appointmentsMap.values()).filter(appointment => {
          const appointmentDate = new Date(appointment.Date);
          appointmentDate.setHours(0, 0, 0, 0); // Normalize the appointment date
          return appointmentDate.getTime() === normalizedSelectedDate.getTime();
        });
      })
    );
  }
}
