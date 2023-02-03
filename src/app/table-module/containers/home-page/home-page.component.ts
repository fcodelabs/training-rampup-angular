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
import { first, map, toArray } from "rxjs/operators";
import {  PersonInterface } from "src/app/models/person-interface";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent {
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 10,
  };
  public view: Observable<GridDataResult> | undefined;
  error$: Observable<string | null>;
  isLoading$: Observable<boolean>;
  public data: PersonInterface[] = [];
  private editedRowIndex: number | undefined;
  public formGroup: FormGroup | undefined;
  public maxDate: Date = new Date(2004, 12, 31);

  constructor(
    private store: Store<AppStateInterface>,
   
  ) {}

  ngOnInit(): void {
    this.store.dispatch(personActions.getPersonstart());
    this.view = this.store.pipe(
      select(personDataSelector),
      map((data) => process(data, this.gridState))
    );
  }

  /

  public addHandler(args: AddEvent): void {
    // define all editable fields validators and default values
    this.closeEditor(args.sender);
    this.formGroup = new FormGroup({
      PersonName: new FormControl("", Validators.required),
      PersonGender: new FormControl("", Validators.required),
      PersonAddress: new FormControl("", Validators.required),
      PersonMobileNo: new FormControl("", Validators.required),
      DateOfBirth: new FormControl(new Date(), Validators.required),
    });
    // show the new row editor, with the `FormGroup` build above
    args.sender.addRow(this.formGroup);
  }

  public editHandler(args: EditEvent): void {
    // define all editable fields validators and default values
    const { dataItem } = args;
    this.closeEditor(args.sender);
    this.formGroup = new FormGroup({
      PersonName: new FormControl(
        dataItem.PersonName,
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-z]{5,15}"),
        ])
      ),
      PersonGender: new FormControl(dataItem.PersonGender, Validators.required),
      PersonAddress: new FormControl(
        dataItem.PersonAddress,
        Validators.required
      ),
      PersonMobileNo: new FormControl(
        dataItem.PersonMobileNo,
        Validators.required
      ),
      DateOfBirth: new FormControl(
        new Date(dataItem.DateOfBirth),
        Validators.compose([Validators.required, this.ageValidator])
      ),
    });

    this.editedRowIndex = args.rowIndex;
    // put the row in edit mode, with the `FormGroup` build above
    args.sender.editRow(args.rowIndex, this.formGroup);
  }

  private closeEditor(grid: GridComponent, rowIndex = this.editedRowIndex) {
    // close the editor
    grid.closeRow(rowIndex);
    // reset the helpers
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }
  public saveHandler({
    sender,
    rowIndex,
    formGroup,
    isNew,
    dataItem,
  }: SaveEvent): void {
    const personData: PersonInterface = formGroup.value;
    if (dataItem.PersonID) {
      personData.PersonID = dataItem.PersonID;
    }
    //this.editService.save(personData, isNew);
    if (isNew) {//todo implement the backend api
      this.store.dispatch(personActions.addPersonstart({ personData }));
    } else {
      this.store.dispatch(personActions.updatePersonstart({ personData }));
    }
    sender.closeRow(rowIndex);
  }
  public removeHandler(args: RemoveEvent): void {
    this.store.dispatch(//todo implement the backend api
      personActions.deletePersonstart({ PersonID: args.dataItem.PersonID })
    );
  }

  public cancelHandler(args: CancelEvent): void {
    // close the editor for the given row
    this.closeEditor(args.sender, args.rowIndex);
  }

  public onStateChange(state: State): void {
    this.gridState = state;
    this.store.dispatch(personActions.getPersonstart());
  }
  protected ageCalculator(birthday: string): number {
    const start = new Date(birthday);
    const end = new Date();
    return durationInYears(start, end);
  }
}
