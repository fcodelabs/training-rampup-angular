import { createAction, props } from "@ngrx/store";
import { PersonInterface } from "src/app/models/person-interface";

export const getPersonstart = createAction("[Post] Get PersonData start");
export const getPersonSuccess = createAction(
  "[Post] Get PersonData success",
  props<{ personData: PersonInterface[] }>()
);
export const getPersonFailure = createAction(
  "[Post] Get PersonData failure",
  props<{ error: string }>()
);
