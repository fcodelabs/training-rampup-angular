import {  createReducer, on } from '@ngrx/store';
import * as studentAction from '../action/student.action';
import { studentData } from '../types/studenType';

export const initialState:studentData={
  students:[],
  error:null
};

export const studentReducer=createReducer(
  initialState,
  on(studentAction.getStudent,(state, )=>({...state})),
  on(studentAction.getStudentSuccess,(state, action)=>({...state,students:action.student})),
  on(studentAction.addStudent,(state, )=>({...state})),
  on(studentAction.updateStudent,(state, )=>({...state})),
  on(studentAction.deleteStudent,(state, )=>({...state})),
  on(studentAction.actionFailure,(state,action )=>({...state,error: action.error}))
);