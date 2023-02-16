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
      id:this.studentData.length+1,
      name:'',
      gender:'',
      address:'',
      mobileNo:'',
      birth: '',
      age:0
    });
    args.sender.addRow(this.formGroup);
  }
 
 
  public getAge (event:Date){
    let age:Date | number = event;

    const diffms = Date.now() - event.getTime();
    const agedt = new Date(diffms);
    const tempAge = Math.abs(agedt.getUTCFullYear() - 1970);
 
    if (tempAge > 18) {
      age = tempAge;
      this.formGroup?.controls['age'].setValue(age);
    } else {
      age = 0;
      alert('age needs to be more than 18 years....!');
    }
  }
  public disabledDates = (date: Date): boolean => {
    const today=new Date();
    return date > today ;
  };

  //cancel changes
  public cancelHandler(args: CancelEvent): void {
    this.closeEditor(args.sender, args.rowIndex);
  }


  //save student
  public saveHandler({ sender, rowIndex, formGroup, isNew }: SaveEvent): void {
    const student = formGroup.value;
    if(isNew){
      this.studentData.unshift(student);
    }else{
      const tempData=this.studentData.find((item)=>{
        return item.id===student.id;
      });
      if(tempData){
        const index=this.studentData.indexOf(tempData);
        this.studentData[index]=student;
      }
    }
    
    sender.closeRow(rowIndex);
  }


  //remove student 
  public removeHandler(args: RemoveEvent): void {
    const index=this.studentData.indexOf(args.dataItem);
    this.studentData.splice(index,1);
  }


  //edit student
  public editHandler(args: EditEvent): void {
    const { dataItem } = args;
    this.closeEditor(args.sender);

    this.formGroup = this.createFormGroup(dataItem);

    this.editedRowIndex = args.rowIndex;
    args.sender.editRow(args.rowIndex, this.formGroup);
  }


  createFormGroup = (dataItem:studentDetails) =>
    new FormGroup({
      id:new FormControl(dataItem.id,Validators.required),
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



  private closeEditor(
    grid: GridComponent,
    rowIndex = this.editedRowIndex
  ): void {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }
}


