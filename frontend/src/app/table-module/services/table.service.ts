import { Observable, map } from "rxjs";
import { PersonInterface } from "./../../models/person-interface";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class TableService {
  constructor(private http: HttpClient) {}

  fetchPersondata(): Observable<PersonInterface[]> {
    const headers = new HttpHeaders().set(
      "Content-Type",
      "application/json; charset=utf-8"
    );
    return this.http
      .get("http://localhost:5000/api/students", { headers: headers })
      .pipe(map((data: any) => data));
  }
}
