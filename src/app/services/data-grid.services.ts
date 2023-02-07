import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map, Observable } from 'rxjs'
import { Student } from '../models/student.models'
import { Socket } from 'ngx-socket-io'
import { environment } from 'src/environments/environments'


@Injectable({
	providedIn: 'root',
})
export class DataGridServices {
	constructor(private http: HttpClient, private socket: Socket) {
		this.socket
			.on('notification',(...args:any) => alert(args[0]))
	}

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
		return this.http.delete<Student>(environment.STUDENT_URL + '/' + id)
	}

}
