import { Component } from '@angular/core'
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
			mobileNo:'0771231234',
			dateOfBirth: new Date('2000-03-26'),
			age: 22,
		},
		{
			id: 2,
			name: 'Zack',
			gender: Gender.MALE,
			address: 'Galle',
			mobileNo:'0771231234',
			dateOfBirth: new Date('2000-03-26'),
			age: 22,
		},
	]
}
