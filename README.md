# angular-servicerootleveldi

employee.ts (parent)

```js
export interface IEmployee {
  id: number;
  code: string;
  name: string;
  salary: number;
  starRating: number;
}
```

employee.service.ts

```js
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
```

employee-component.component.ts (parent)

```js
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
```
employee-component.component.html (parent)

```html
<div>
  <div>
    <input type="text" [(ngModel)]="listFilter" />
  </div>
  <br />
  <div>
    Filter By: {{listFilter}}
  </div>
  <div>
    <table>
      <thead>
        <td>Id</td>
        <td>Code</td>
        <td>Name</td>
        <td>Salary</td>
        <td>Rating</td>
      </thead>
      <tr *ngFor="let employee of filteredEmployees">
        <td>{{employee.id}}</td>
        <td>{{employee.code}}</td>
        <td>{{employee.name}}</td>
        <td>{{employee.salary}}</td>
        <td><app-star [rating]="employee.starRating"></app-star></td>
      </tr>
    </table>
  </div>
</div>
```
star.component.ts (child)

```js
import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges {
  constructor() {}

  @Input() rating: number = 0;
  cropWidth: number = 75;

  ngOnChanges(): void {
    this.cropWidth = this.rating * (75 / 5);
  }
}
```

star.component.html (child)

```html
<div class="crop" [style.width.px]="cropWidth" title="rating">
  <div style="width:75px">
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
  </div>
</div>
```

star.component.css (child)

```css
.crop {
  overflow: hidden;
}
div {
  cursor: pointer;
}
```

style.css

Install bootstrap font-awesome and import in style.css

```css
@import '~bootstrap/dist/css/bootstrap.min.css';
@import 'font-awesome/css/font-awesome.min.css';
```

app.module.ts

```js
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { EmployeeComponentComponent } from './employee-component/employee-component.component';
import { StarComponent } from './shared/star/star.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, EmployeeComponentComponent, StarComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

app.component.html

```html
<app-employee-component></app-employee-component>
```

![image](https://user-images.githubusercontent.com/38757471/130339384-276bc6d4-d8c1-452e-b8d8-2ca23e3e8ff7.png)


