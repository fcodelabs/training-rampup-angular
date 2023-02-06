import { createAction, props } from '@ngrx/store'
import { Student } from '../../models/student.models'

export const getStudents = createAction('[Home Page] Get Students')
export const getStudentsSuccess = createAction(
	'[Home Page] Get Students Success',
	props<{ students: Student[] }>()
)
export const addStudent = createAction(
	'[Home Page] add Student',
	props<{ student: Student }>()
)
export const updateStudent = createAction(
	'[Home Page] update Student',
	props<{ student: Student }>()
)
export const deleteStudent = createAction(
	'[Home Page] delete Student',
	props<{ id: string }>()
)
export const actionFailed = createAction(
	'[Home Page] Action Failed',
	props<{ error: string }>()
)
