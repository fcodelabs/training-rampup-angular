import { Injectable } from '@angular/core';
import { PostsService } from '../../post-module/services/posts-service';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { map, mergeMap, catchError, of, switchMap } from 'rxjs';
import * as PostsActions from '../actions/postAction';

@Injectable()
export class PostsEffects {
  getPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.getPost),
      switchMap(() => {
        return this.postsService.getCards().pipe(
          map((posts) => PostsActions.getPostSuccess({ posts })),
          catchError((error) =>
            of(PostsActions.getPostFailure({ error: error.message }))
          )
        );
      })
    )
  );

addPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.addPostStart),
      mergeMap((newcard) => {
        return this.postsService.addCards(newcard.post).pipe(
          map((post) => PostsActions.addPostSuccess({ post })),
          catchError((error) =>
            of(PostsActions.getPostFailure({ error: error.message }))
          )
        );
      })
    )
  );


  constructor(private actions$: Actions, private postsService: PostsService) {}
}
