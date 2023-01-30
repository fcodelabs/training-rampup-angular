import { AppStateInterface } from "src/app/types/appState.interface";
import { Observable } from "rxjs";
import {
  cardsSelector,
  errSelector,
  isLoadingSelector,
} from "./../../../store/selectors/postsSelector";
import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as PostsActions from "../../../store/actions/postAction";

import {
  collectionData,
  DocumentData,
  Firestore,
  onSnapshot,
  addDoc,
} from "@angular/fire/firestore";
import { collection, CollectionReference } from "@firebase/firestore";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent {
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  postCollection: CollectionReference<DocumentData>;

  constructor(private store: Store<AppStateInterface>, firestore: Firestore) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errSelector));
    this.postCollection = collection(firestore, "messages");
  }

  ngOnInit(): void {
    onSnapshot(this.postCollection, (snapshot) => {
      this.store.dispatch(PostsActions.getPost());
    });
  }
}
