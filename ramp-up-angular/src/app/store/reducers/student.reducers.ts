import { Action, createReducer, on } from '@ngrx/store';
import { studentDetails } from 'src/app/models/studentDetails';
import * as studentAction from '../action/student.action';
import { studentData } from '../types/studenType';

export const initialState:studentData={
  students:[],
  error:null
};

export const studentReducer=createReducer(
  initialState,
  on(studentAction.getStudent,(state, action)=>({...state})),
  on(studentAction.getStudentSuccess,(state, action)=>({...state,students:action.student})),
  on(studentAction.addStudent,(state, action)=>({...state})),
  on(studentAction.updateStudent,(state, action)=>({...state})),
  on(studentAction.deleteStudent,(state, action)=>({...state})),
);