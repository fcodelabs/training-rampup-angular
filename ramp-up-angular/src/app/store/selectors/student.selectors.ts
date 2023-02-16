import { createFeatureSelector, createSelector } from '@ngrx/store';
import { studentData } from '../types/studenType';

export const studentFeature=createFeatureSelector<studentData>('student');
export const selectStudent= createSelector(
  studentFeature,
  (state)=>state.students
);