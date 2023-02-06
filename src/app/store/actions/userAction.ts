import { createAction, props } from '@ngrx/store';
import { UserInterface } from 'src/app/models/user-interface';
//namespace posts
export const getUserStart = createAction('[Post] Get user');
export const getUserSuccess = createAction(
  '[Post] Get user success',
  props<{ user: UserInterface }>()
);
export const getUserFailure = createAction('[Post] Get user failure');
