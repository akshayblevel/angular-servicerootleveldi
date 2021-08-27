import { Injectable } from '@angular/core';
import { IEmployee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  getEmployees(): IEmployee[] {
    return [
      {
        id: 1,
        code: 'VOD1410',
        name: 'Akshay Patel',
        salary: 3000,
        starRating: 3.5
      },
      {
        id: 2,
        code: 'VOD1710',
        name: 'Panth Patel',
        salary: 1500,
        starRating: 4
      },
      {
        id: 2,
        code: 'VOD0408',
        name: 'Satish Patel',
        salary: 5000,
        starRating: 4.5
      }
    ];
  }
}
