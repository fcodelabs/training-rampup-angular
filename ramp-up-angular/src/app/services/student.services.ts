import { Injectable } from '@angular/core';
import { Observable,map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { studentDetails } from '../models/studentDetails';
import { STUDENT_API } from '../environments/environment';
import { Socket } from 'ngx-socket-io';
@Injectable({
  providedIn: 'root',
})
export class StudentServices{
  //students:studentDetails[]=[];
  constructor(private http:HttpClient,private socket: Socket){
    this.socket.on('notification',(...args:any) => alert(args[0]));
  }

  getStudent():Observable<studentDetails[]>{
    console.log('done 1');
    return this.http.get<studentDetails[]>(STUDENT_API);
  } 

  addStudent(student:studentDetails):Observable<studentDetails>{
    return this.http.post<studentDetails>(STUDENT_API,student);
  }

  updateStudent(student:studentDetails):Observable<studentDetails>{
    return this.http.patch<studentDetails>(STUDENT_API,student);
  }

  deleteStudent(id:number):Observable<studentDetails>{
    return this.http.delete<studentDetails>(STUDENT_API+'/'+id);
  }
}