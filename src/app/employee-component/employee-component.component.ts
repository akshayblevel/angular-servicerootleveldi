import { Component, OnInit } from '@angular/core';
import { IEmployee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee-component',
  templateUrl: './employee-component.component.html',
  styleUrls: ['./employee-component.component.css']
})
export class EmployeeComponentComponent implements OnInit {
  private _listFilter: string = '';
  filteredEmployees: IEmployee[] = [];
  employees: IEmployee[] = [];

  constructor(private employeeService: EmployeeService) {}

  //ALTERNATIVE CODE OF CONSTRUCTOR
  // private employeeService;
  // constructor(employeeService: EmployeeService) {
  //   this.employeeService = employeeService;
  // }

  ngOnInit() {
    this.employees = this.employeeService.getEmployees();
    this.listFilter = 'Patel';
  }

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    console.log('In Setter:', value);
    this.filteredEmployees = this.performFilter(value);
  }

  performFilter(filterBy: string): IEmployee[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.employees.filter((employee: IEmployee) =>
      employee.name.toLocaleLowerCase().includes(filterBy)
    );
  }
}
