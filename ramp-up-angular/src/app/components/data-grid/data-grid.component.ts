import { Component } from '@angular/core';

import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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
  
  public addHandler(args: AddEvent, formInstance: NgForm): void {
    formInstance.reset();
    // close the previously edited item
    this.closeEditor(args.sender);
    // open a new item editor
    args.sender.addRow(new Student());
  }

  public cancelHandler(args: CancelEvent): void {
    // call the helper method
    this.closeEditor(args.sender, args.rowIndex);
  }


  private closeEditor(
    grid: GridComponent,
    rowIndex = this.editedRowIndex
  ): void {
    // close the editor
    grid.closeRow(rowIndex);
    // revert the data item to original state
    //this.editService.resetItem(this.editedProduct);
    // reset the helpers
    this.editedRowIndex = undefined;
    this.editedProduct = undefined;
  }
}


