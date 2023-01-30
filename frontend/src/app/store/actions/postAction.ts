import { createAction, props } from '@ngrx/store';
import { PostInterface } from 'src/app/models/post-interface';
//namespace posts
export const getPost = createAction('[Post] Get Posts');
export const getPostSuccess = createAction(
  '[Post] Get Posts success',
  props<{ posts: PostInterface[] }>()
);
export const getPostFailure = createAction(
  '[Post] Get Posts failure',
  props<{ error: string }>()
);

export const addPostStart = createAction(
  '[Post] Add Post',
  props<{ post: PostInterface }>()
);
export const addPostSuccess = createAction(
  '[Post] Add Post success',
   props<{ post: PostInterface }>()
);
export const addPostFailure = createAction(
  '[Post] Add Post failure',
  props<{ error: string }>()
);
