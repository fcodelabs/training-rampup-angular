import { TableService } from "./../../table-module/services/table.service";
import { Injectable } from "@angular/core";

import { createEffect, ofType, Actions } from "@ngrx/effects";
import { map, mergeMap, catchError, of, switchMap } from "rxjs";
import * as PersonActions from "../actions/personAction";

@Injectable()
export class PersonEffects {
constructor(private actions$: Actions, private personService: TableService) {}

  getPersonData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PersonActions.getPersonstart),
      switchMap(() => {
        return this.personService.fetchPersondata().pipe(
          map((personData) => PersonActions.getPersonSuccess({ personData })),
          catchError((error) =>
            of(PersonActions.getPersonFailure({ error: error.message }))
          )
        );
      })
    )
  );

  // addPost$ = createEffect(() =>
  //     this.actions$.pipe(
  //       ofType(PostsActions.addPostStart),
  //       mergeMap((newcard) => {
  //         return this.postsService.addCards(newcard.post).pipe(
  //           map((post) => PostsActions.addPostSuccess({ post })),
  //           catchError((error) =>
  //             of(PostsActions.getPostFailure({ error: error.message }))
  //           )
  //         );
  //       })
  //     )
  //   );

  
}
