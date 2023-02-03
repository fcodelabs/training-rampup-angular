import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import {
	AddEvent,
	CancelEvent,
	EditEvent,
	GridComponent,
	RemoveEvent,
	SaveEvent,
} from '@progress/kendo-angular-grid'
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
			id: '',
			name: '',
			age: 0,
			address: '',
			mobileNo: '',
			dateOfBirth:'',
			gender: '',
		})

		sender.addRow(this.formGroup)
	}

	public saveHandler({ sender, rowIndex, formGroup, isNew }: SaveEvent): void {
		const student = formGroup.value
		if (isNew) {
			this.gridData.unshift(student)
		} else {
			const temp = this.gridData.find((item) => {
				return item.id === student.id
			})
			if (temp) {
				const index = this.gridData.indexOf(temp)
				this.gridData[index] = student
			}
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
		const index = this.gridData.indexOf(dataItem)
		this.gridData.splice(index, 1)
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

const createFormGroup = (dataItem: Student) =>
	new FormGroup({
		id: new FormControl(dataItem.id),
		name: new FormControl(dataItem.name, Validators.required),
		gender: new FormControl(dataItem.gender, Validators.required),
		address: new FormControl(dataItem.address, Validators.required),
		age: new FormControl(dataItem.age),
		dateOfBirth: new FormControl(dataItem.dateOfBirth, Validators.required),
		mobileNo: new FormControl(dataItem.mobileNo, Validators.required),
	})
