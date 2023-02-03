import { createFeatureSelector, createSelector } from '@ngrx/store'
import { DataGridState } from '../state/data-grid.state'

export const selectStudentFeature = createFeatureSelector<DataGridState>('students')

export const selectStudents = createSelector(
	selectStudentFeature,
	(state) => state.students
)