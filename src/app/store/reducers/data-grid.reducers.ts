/* eslint-disable @ngrx/on-function-explicit-return-type */
import { createReducer, on } from '@ngrx/store'
import * as StudentActions from '../actions/data-grid.actions'
import { DataGridState } from '../state/data-grid.state'

export const initialState: DataGridState = {
	students: [],
	isLoading: false,
	error: null,
}

export const studentReducer = createReducer(
	initialState,
	on(StudentActions.getStudents, (state) => ({
		...state,
		isLoading: true,
	})),
	on(StudentActions.getStudentsSuccess, (state, action) => ({
		...state,
		students: action.students,
		isLoading: false,
	})),
	on(StudentActions.addStudent, (state) => ({
		...state,
		isLoading: true,
	})),
	on(StudentActions.actionFailed, (state, action) => ({
		...state,
		error: action.error,
		isLoading: false,
	})),
	on(StudentActions.updateStudent, (state) => ({
		...state,
		isLoading: true,
	})),
	on(StudentActions.deleteStudent, (state) => ({
		...state,
		isLoading: true,
	}))
)
