import { Injectable } from '@angular/core';
import { Appointment } from '../interfaces/appointment';

@Injectable({
  providedIn: 'root'
})
export class ManageDateService {

  constructor() { }

  public saveDate(key: string, value: Appointment) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getDate(key: string) {
    return localStorage.getItem(key)
  }
  public removeDate(key: string) {
    localStorage.removeItem(key);
  }

  public clearDate() {
    localStorage.clear();
  }
}
