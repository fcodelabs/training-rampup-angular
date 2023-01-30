import { UserStateInterface } from './../store/state/userState';
import { PostsStateInterface } from '../store/state/postsState';

export interface AppStateInterface {
  posts: PostsStateInterface;
  user: UserStateInterface;
}
