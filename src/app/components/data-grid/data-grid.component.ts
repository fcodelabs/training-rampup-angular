import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import {
	AddEvent,
	CancelEvent,
	EditEvent,
	GridComponent,
	RemoveEvent,
	SaveEvent,
} from '@progress/kendo-angular-grid'
import { Observable } from 'rxjs'
import { Gender, Student } from 'src/app/models/student.models'
import { DataGridServices } from 'src/app/services/data-grid.services'
import {
	addStudent,
	deleteStudent,
	getStudents,
	updateStudent,
} from 'src/app/store/actions/data-grid.actions'
import { selectStudents } from 'src/app/store/selectors/data-grid.selectors'
import { DataGridState } from 'src/app/store/state/data-grid.state'

@Component({
	selector: 'app-data-grid',
	templateUrl: './data-grid.component.html',
	styleUrls: ['./data-grid.component.css'],
})
export class DataGridComponent {
	public gridData: Observable<Student[]> = this.store.select(selectStudents)

	public genderCategories: Gender[] = [Gender.MALE, Gender.FEMALE]
	public formGroup: FormGroup | undefined
	private editedRowIndex: number | undefined

	constructor(
    private store: Store<DataGridState>,
    private dataGridServices: DataGridServices
	) {}

	ngOnInit(): void {
		this.store.dispatch(getStudents())
	}
	public disabledDates = (date: Date): boolean => {
		const today = new Date()
		return today.getTime() - date.getTime() < 0
	}

	public addHandler({ sender }: AddEvent): void {
		this.closeEditor(sender)

		this.formGroup = createFormGroup({
			id: '',
			name: '',
			age: '',
			address: '',
			mobileNo: '',
			dateOfBirth: '',
			gender: '',
		})

		sender.addRow(this.formGroup)
	}

	public saveHandler({ sender, rowIndex, formGroup, isNew }: SaveEvent): void {
		const student: Student = formGroup.value
		if (isNew) {
			this.store.dispatch(addStudent({ student }))
		} else {
			this.store.dispatch(updateStudent({ student }))
		}
		sender.closeRow(rowIndex)
	}

	public editHandler({ sender, rowIndex, dataItem }: EditEvent): void {
		this.closeEditor(sender)
		this.formGroup = createFormGroup(dataItem)
		this.editedRowIndex = rowIndex
		sender.editRow(rowIndex, this.formGroup)
	}

	public removeHandler({ dataItem }: RemoveEvent): void {
		const id: string = dataItem.id
		this.store.dispatch(deleteStudent({ id }))
	}

	public cancelHandler({ sender, rowIndex }: CancelEvent): void {
		this.closeEditor(sender, rowIndex)
	}

	private closeEditor(
		grid: GridComponent,
		rowIndex = this.editedRowIndex
	): void {
		grid.closeRow(rowIndex)
		this.editedRowIndex = undefined
		this.formGroup = undefined
	}

	public calculateAge(event: Date) {
		const today = new Date().getTime()
		const birthday = event.getTime()
		const tempAge = Math.floor((today - birthday) / (86400000 * 365))
		const age = tempAge >= 0 ? tempAge : ''
		this.formGroup?.controls['age'].setValue(age)
	}
}

const createFormGroup = (dataItem: any) =>
	new FormGroup({
		id: new FormControl(dataItem.id),
		name: new FormControl(
			dataItem.name,
			Validators.compose([
				Validators.required,
				Validators.pattern('^([A-z\\s.]{3,80})$'),
			])
		),
		gender: new FormControl(dataItem.gender, Validators.required),
		address: new FormControl(
			dataItem.address,
			Validators.compose([
				Validators.required,
				Validators.pattern('^([A-z0-9/,\\s]{3,})$'),
			])
		),
		age: new FormControl(
			dataItem.age,
			Validators.compose([Validators.required, Validators.min(18)])
		),
		dateOfBirth: new FormControl(dataItem.dateOfBirth, Validators.required),
		mobileNo: new FormControl(
			dataItem.mobileNo,
			Validators.compose([
				Validators.required,
				Validators.pattern('^([0][0-9]{9}|[0][0-9]{2}[-\\s][0-9]{7})$'),
			])
		),
	})
