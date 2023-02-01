import {
  errSelector,
  isLoadingSelector,
  personDataSelector,
} from "./../../../store/selectors/personSelector";
import { Observable } from "rxjs";
import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import {
  GridComponent,
  GridDataResult,
  CancelEvent,
  EditEvent,
  RemoveEvent,
  SaveEvent,
  AddEvent,
} from "@progress/kendo-angular-grid";
import { State, process } from "@progress/kendo-data-query";
import { first, map } from "rxjs/operators";
import { sampleData } from "../../helpers/sampleProducts";
import { PersonInterface } from "src/app/models/person-interface";
import { AppStateInterface } from "src/app/types/appState.interface";
import { select, Store } from "@ngrx/store";
import * as personActions from "../../../store/actions/personAction";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent {
  public view: PersonInterface[] = [];
  personData$: Observable<PersonInterface[]>;
  error$: Observable<string | null>;
  isLoading$: Observable<boolean>;
  public data: PersonInterface[] = [];

  public gridState: State = {
    sort: [],
    skip: 0,
    take: 5,
  };

  constructor(private store: Store<AppStateInterface>) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errSelector));
    this.personData$ = this.store.pipe(select(personDataSelector));
  }

  ngOnInit(): void {
    this.store.dispatch(personActions.getPersonstart());
    this.personData$.pipe(first()).subscribe((val) => (this.data = val));
    console.log(this.data);
  }
}
