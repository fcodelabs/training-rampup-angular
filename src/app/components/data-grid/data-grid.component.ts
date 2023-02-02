import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AddEvent, GridComponent, SaveEvent } from '@progress/kendo-angular-grid'
import { Gender, Student } from 'src/app/models/student.models'

@Component({
	selector: 'app-data-grid',
	templateUrl: './data-grid.component.html',
	styleUrls: ['./data-grid.component.css'],
})
export class DataGridComponent {
	public gridData: Student[] = [
		{
			id: 1,
			name: 'Chai',
			gender: Gender.FEMALE,
			address: 'Galle',
			mobileNo: '0771231234',
			dateOfBirth: new Date('2000-03-26'),
			age: 22,
		},
		{
			id: 2,
			name: 'Zack',
			gender: Gender.MALE,
			address: 'Galle',
			mobileNo: '0771231234',
			dateOfBirth: new Date('2000-03-26'),
			age: 22,
		},
	]
	public genderCategories: Gender[] = [Gender.MALE, Gender.FEMALE]
	public formGroup: FormGroup | undefined
	private editedRowIndex: number | undefined

	public addHandler({ sender }: AddEvent): void {
		this.closeEditor(sender)

		this.formGroup = createFormGroup({
			name: '',
			age: '',
			address: '',
			mobileNo: '',
			dateOfBirth: '',
			gender: 1,
		})

		sender.addRow(this.formGroup)
	}

	public saveHandler({ sender, rowIndex, formGroup }: SaveEvent): void {
		const student = formGroup.value
		this.gridData.unshift(student)
		sender.closeRow(rowIndex)
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
		name: new FormControl(dataItem.name, Validators.required),
		gender: new FormControl(dataItem.gender,Validators.required),
		address: new FormControl(dataItem.address,Validators.required),
		age: new FormControl(dataItem.age),
		dateOfBirth: new FormControl(dataItem.dateOfBirth,Validators.required),
		mobileNo: new FormControl(dataItem.mobileNo, Validators.required),
	})
