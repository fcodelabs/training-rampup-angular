import { createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';

export const selectFeaturePosts = (state: AppStateInterface) => state.posts;

export const isLoadingSelector = createSelector(
  selectFeaturePosts,
  (postsState) => postsState.isLoading
);
export const cardsSelector = createSelector(
  selectFeaturePosts,
  (postsState) => postsState.posts
);
export const errSelector = createSelector(
  selectFeaturePosts,
  (postsState) => postsState.error
);
