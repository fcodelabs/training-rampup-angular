import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Student } from '../models/student.models'

@Injectable({
	providedIn: 'root',
})
export class DataGridServices {
	baseURL = 'http://localhost:5000/student'

	constructor(private http: HttpClient) {}

	getStudents() {
		console.log('here')
		return new Observable<Student[]>((observer) => {
			this.http
				.get<Student[]>('http://localhost:5000/student')
				.subscribe((students: Student[]) => {
					console.log(students)
					observer.next(students)
				})
		})
	}

	addStudent(student: Student): Observable<Student> {
		return new Observable<Student>((observer) => {
			this.http.post('http://localhost:5000/student', student).subscribe(() => {
				observer.next(student)
			})
		})
	}

	updateStudent(student: Student): Observable<Student> {
		return new Observable<Student>((observer) => {
			this.http
				.patch('http://localhost:5000/student', student)
				.subscribe(() => {
					observer.next()
				})
		})
	}

	deleteStudent(id: string): Observable<Student> {
		return new Observable<Student>((observer) => {
			this.http.delete('http://localhost:5000/student/' + id).subscribe(() => {
				observer.next()
			})
		})
	}
}
