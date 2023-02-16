import { Component } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { studentDetails } from 'src/app/models/studentDetails';
import {
  CancelEvent,
  EditEvent,
  GridComponent,
  RemoveEvent,
  SaveEvent,
  AddEvent,
} from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs';
import { selectStudent } from 'src/app/store/selectors/student.selectors';
import { getStudent,addStudent,updateStudent,deleteStudent } from 'src/app/store/action/student.action';

@Component({

  selector: 'app-data-grid',

  templateUrl: './data-grid.component.html',

  styleUrls: ['./data-grid.component.css'],

})

export class DataGridComponent {

  public studentData: Observable<studentDetails[]> = this.store.pipe(
    select(selectStudent)
  );

  constructor(private store: Store<{ Student:studentDetails }>) {}

  ngOnInit(): void {
    this.store.dispatch(getStudent());
  }

  private editedRowIndex: number | undefined;
  public value: Date = new Date(2000, 2, 10);
  public formGroup: FormGroup | undefined;
  public listItems: Array<string> = [
    'Male',
    'Female'
  ]; 
  public disabledDates = (date: Date): boolean => {
    const today=new Date();
    return date > today ;
  };



  //add new student
  public addHandler(args: AddEvent): void  {
    this.closeEditor(args.sender);
    this.formGroup = this.createFormGroup({ 
      id:0,
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
    const diffms = Date.now() - event.getTime();
    const agedt = new Date(diffms);
    const tempAge = Math.abs(agedt.getUTCFullYear() - 1970);
    if (tempAge > 18) {
      this.formGroup?.controls['age'].setValue(tempAge);
    } else {
      this.formGroup?.controls['age'].setValue('');
      alert('age needs to be more than 18 years....!');
    }
  }

 

  //cancel changes
  public cancelHandler(args: CancelEvent): void {
    this.closeEditor(args.sender, args.rowIndex);
  }



  //save student
  public saveHandler({ sender, rowIndex, formGroup, isNew }: SaveEvent): void {
    const student = formGroup.value;
    if(isNew){
      this.store.dispatch(addStudent({student}));
    }else{
      this.store.dispatch(updateStudent({student}));
    }
    sender.closeRow(rowIndex);
  }



  //remove student 
  public removeHandler(args: RemoveEvent): void {
    const id:number=args.dataItem.id;
    this.store.dispatch(deleteStudent({id}));
  }



  //edit student
  public editHandler(args: EditEvent): void {
    const { dataItem } = args;
    const student:studentDetails={
      ...dataItem,birth:new Date(dataItem.birth)
    };
    this.closeEditor(args.sender);

    this.formGroup = this.createFormGroup(student);

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


