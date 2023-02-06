import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Student } from '../models/student.models'
import { environment } from 'src/environments/environment'

@Injectable({
	providedIn: 'root',
})
export class DataGridServices {

	constructor(private http: HttpClient) {}

	getStudents() {
		return this.http.get<Student[]>(environment.STUDENT_URL)
	}

	addStudent(student: Student): Observable<Student> {
		return this.http.post<Student>(environment.STUDENT_URL, student)
	}

	updateStudent(student: Student): Observable<Student> {
		return this.http.patch<Student>(environment.STUDENT_URL, student)
				
	}

	deleteStudent(id: string): Observable<Student> {
		return this.http.delete<Student>(environment.STUDENT_URL+'/'+ id)
	}
}
