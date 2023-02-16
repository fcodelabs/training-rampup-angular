import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { getStudent,
  getStudentSuccess,
  actionFailure,addStudent,
  updateStudent,
  deleteStudent } from '../action/student.action';
import { StudentServices } from '../../services/student.services';

@Injectable()
export class studentEffects{

  loadAllStudents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getStudent),
      mergeMap(() =>
        this.StudentServices.getStudent().pipe(
          map((student) => getStudentSuccess({ student })),
          catchError((error) => of(actionFailure({ error })))
        )
      )
    )
  );

  addStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addStudent),
      mergeMap(({student} ) =>
        this.StudentServices.addStudent( student ).pipe(
          map(() => getStudent()),
          catchError((error) => of(actionFailure({ error })))
        )
      )
    )
  );

  updateStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateStudent),
      mergeMap(({student} ) =>
        this.StudentServices.updateStudent( student ).pipe(
          map(() => getStudent()),
          catchError((error) => of(actionFailure({ error })))
        )
      )
    )
  );

  deleteStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteStudent),
      mergeMap(({id} ) =>
        this.StudentServices.deleteStudent( id ).pipe(
          map(() => getStudent()),
          catchError((error) => of(actionFailure({ error })))
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private StudentServices: StudentServices
  ) {} 
}