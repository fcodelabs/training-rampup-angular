import { createReducer, on } from '@ngrx/store';
import { PostsStateInterface } from '../state/postsState';
import * as PostActions from '../actions/postAction';

export const initialState: PostsStateInterface = {
  isLoading: false,
  posts: [],
  error: null,
};

export const reducers = createReducer(
  initialState,
  on(PostActions.getPost, (state) => ({ ...state, isLoading: true })),
  on(PostActions.getPostSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    posts: action.posts,

  }
)),
  on(PostActions.getPostFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  
);
