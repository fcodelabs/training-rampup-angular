import { Component } from '@angular/core';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { Observable } from 'rxjs';
import {
  cardsSelector,
  errSelector,
  isLoadingSelector,
} from './../../../store/selectors/postsSelector';

import { OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as PostsActions from '../../../store/actions/postAction';
import { PostInterface } from 'src/app/models/post-interface';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent {
  data = [1, 2, 3, 4, 5, 6, 7, 8];
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  posts$: Observable<PostInterface[]>;

  constructor(private store: Store<AppStateInterface>) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errSelector));
    this.posts$ = this.store.pipe(select(cardsSelector));
    console.log(this.posts$);
  }

  ngOnInit(): void {
    this.store.dispatch(PostsActions.getPost());
  }
}
