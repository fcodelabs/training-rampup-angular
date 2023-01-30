import { Injectable } from '@angular/core';
import {
  collectionData,
  DocumentData,
  Firestore,
  onSnapshot,
  addDoc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from '@angular/fire/firestore';
import { collection, CollectionReference } from '@firebase/firestore';

import { Observable, delay, of, map } from 'rxjs';
import { PostInterface } from 'src/app/models/post-interface';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  postCollection: CollectionReference<DocumentData>;

  constructor(firestore: Firestore) {
    this.postCollection = collection(firestore, 'messages');
    //  this.item$ = collectionData(cardCollection);
  }

  getCards(): Observable<PostInterface[]> {
    let cardList: PostInterface[] = [];
   
    getDocs(query(this.postCollection, orderBy("time", "asc"))).then((snapshot) => {
      snapshot.forEach((change) => {
        let post: PostInterface = {
          id: change.data()['time'],
          title: change.data()['title'],
          username: change.data()['name'],
          description: change.data()['description'],
          color: change.data()['colour'],
        };

        if (!cardList.some((item) => item.title === post.title)) {
          cardList.push(post);
        }
      });
      console.log(cardList);
    });

    return of(cardList).pipe(delay(1500));
  }

  addCards(post: PostInterface): Observable<PostInterface> {
    const date = new Date();
    addDoc(this.postCollection, {
      time: date,
      title: post.title,
      name: post.username,
      description: post.description,
      colour: post.color,
    });
    const postobj = {
      id: '1',
      title: 'title1',
      description: 'description1',
      username: 'username1',
      color: 'color1',
    };
    return of(postobj).pipe(delay(2000));
  }
}

// Path: src\app\post-module\containers\home-page\home-page.component.ts