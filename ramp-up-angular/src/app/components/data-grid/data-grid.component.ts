import { Component } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Student } from 'src/app/models/studentData';

import { studentDetails } from 'src/app/models/studentDetails';
import {
  GridDataResult,
  CancelEvent,
  EditEvent,
  GridComponent,
  RemoveEvent,
  SaveEvent,
  AddEvent,
} from '@progress/kendo-angular-grid';

@Component({

  selector: 'app-data-grid',

  templateUrl: './data-grid.component.html',

  styleUrls: ['./data-grid.component.css'],

})

export class DataGridComponent {

  public studentData:studentDetails[]=[

    {

      id: 1,
      name: 'kamal',
      gender: 'Male',
      address: 'colombo',
      mobileNo: '12344555',
      birth: new Date('2000-03-26'),
      age: 17,

    },
    {

      id: 1,
      name: 'kamal',
      gender: 'Male',
      address: 'colombo',
      mobileNo: '12344555',
      birth: new Date('2000-03-26'),
      age: 17,

    }

  ];

  //private editService: EditService;
  private editedRowIndex: number | undefined;
  private editedProduct: Student |undefined;
  public formGroup: FormGroup | undefined;
  public listItems: Array<string> = [
    'Male',
    'Female'
  ];
  public value: Date = new Date(2000, 2, 10);

  //add new student
  public addHandler(args: AddEvent): void  {
    this.closeEditor(args.sender);
    this.formGroup = this.createFormGroup({
      
      name:'',
      gender:'',
      address:'',
      mobileNo:'',
      birth:new Date(),
      age:0
    });
    args.sender.addRow(this.formGroup);
  }
 
  createFormGroup = (dataItem:studentDetails) =>
    new FormGroup({
      name:new FormControl(dataItem.name,[
        Validators.required,
        Validators.pattern('^[A-z ]{5,20}$'), 
      ]),
      gender:new FormControl(dataItem.gender,Validators.required),
      address:new FormControl(dataItem.address,[
        Validators.required,
        Validators.pattern('^[A-z ]{5,20}$'), 
      ]),
      mobileNo:new FormControl(dataItem.mobileNo,[
        Validators.required,
        Validators.pattern('^[0-9]{8,10}$'), 
      ]),
      birth:new FormControl(dataItem.birth,Validators.required),
      age:new FormControl(dataItem.age,Validators.required),  
    });
  public getAge (event:Date){
    let age:Date | number = event;
    const tempAge = getAge(event);
    if (tempAge > 18) {
      age = tempAge;
      this.formGroup?.controls['age'].setValue(age);
    } else {
      age = 0;
      alert('age needs to be more than 18 years....!');
    }
  
    function getAge(dob: Date) {
      const diffms = Date.now() - dob.getTime();
      const agedt = new Date(diffms);
      return Math.abs(agedt.getUTCFullYear() - 1970);
    }
  }
  //cancel changes
  public cancelHandler(args: CancelEvent): void {
    this.closeEditor(args.sender, args.rowIndex);
  }
  //save student
  public saveHandler({ sender, rowIndex, formGroup, isNew }: SaveEvent): void {
    const student = formGroup.value;
    // if(checkValidation(student)){

    // }
    this.studentData.unshift(student);
    sender.closeRow(rowIndex);
  }

  private closeEditor(
    grid: GridComponent,
    rowIndex = this.editedRowIndex
  ): void {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }
}


