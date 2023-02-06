import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { map, mergeMap, catchError } from 'rxjs/operators'
import { DataGridServices } from 'src/app/services/data-grid.services'
import {
	getStudents,
	getStudentsSuccess,
	actionFailed,
	addStudent,
	updateStudent,
	deleteStudent,
} from '../actions/data-grid.actions'

@Injectable()
export class DataGridEffects {
	loadStudents$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(getStudents),
			mergeMap(() => {
				return this.dataGridServices.getStudents().pipe(
					map((students) => getStudentsSuccess({ students })),
					catchError((error) => of(actionFailed({ error })))
				)
			})
		)
	})

	addStudent$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(addStudent),
			mergeMap(({ student }) => {
				return this.dataGridServices.addStudent(student).pipe(
					map(() => getStudents()),
					catchError((error) => of(actionFailed({ error })))
				)
			})
		)
	})

	updateStudent$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(updateStudent),
			mergeMap(({ student }) => {
				return this.dataGridServices.updateStudent(student).pipe(
					map(() => getStudents()),
					catchError((error) => of(actionFailed({ error })))
				)
			})
		)
	})

	deleteStudent$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(deleteStudent),
			mergeMap(({ id }) => {
				return this.dataGridServices.deleteStudent(id).pipe(
					map(() => getStudents()),
					catchError((error) => of(actionFailed({ error })))
				)
			})
		)
	})

	constructor(
    private actions$: Actions,
    private dataGridServices: DataGridServices
	) {}
}
