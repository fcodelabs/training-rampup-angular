import { createAction, props } from '@ngrx/store';
import { studentDetails } from 'src/app/models/studentDetails';

export const getStudent=createAction('[Data-grid Page] Get Students');

export const getStudentSuccess=createAction(
  '[Data-grid Page] Get Students Success',props<{student:studentDetails[]}>());

export const addStudent=createAction(
  '[Data-grid Page] Add Students',props<{student:studentDetails}>());

export const updateStudent=createAction(
  '[Data-grid Page] Update Students',props<{student:studentDetails}>());

export const deleteStudent=createAction(
  '[Data-grid Page] Delete Students',props<{id:number}>());

export const actionFailure = createAction(
  '[Data-grid Page] Action Failure',
  props<{ error: string }>()
);