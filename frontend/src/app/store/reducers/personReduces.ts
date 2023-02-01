import { createReducer, on } from '@ngrx/store';
import * as PersonActions from '../actions/personAction';
import { PersonStateInterface } from '../state/personState';

export const initialState: PersonStateInterface = {
  isLoading: false,
  personData: [],
  error: null,
};

export const reducers = createReducer(
  initialState,
  on(PersonActions.getPersonstart, (state) => ({ ...state, isLoading: true })),
  on(PersonActions.getPersonSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    personData: action.personData,
  }
)),
  on(PersonActions.getPersonFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  
);
