import { Product, Person } from './../../../models/person-interface';
import { Observable } from 'rxjs';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { GridComponent, GridDataResult, CancelEvent, EditEvent, RemoveEvent, SaveEvent, AddEvent } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { map } from 'rxjs/operators';
import { sampleData } from '../../helpers/sampleProducts';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
   public view: Person[] = [];
    public gridState: State = {
        sort: [],
        skip: 0,
        take: 5
    };


    constructor() {
        this.view = sampleData;
    }



}
