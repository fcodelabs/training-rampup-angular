import { Component } from '@angular/core';

import { NgForm } from '@angular/forms';

import { studentDetails } from 'src/app/models/studentDetails';

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



    }

  ];

}

 