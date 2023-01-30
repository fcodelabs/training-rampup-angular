import { PostInterface } from '../../models/post-interface';
export interface PostsStateInterface {
  isLoading: boolean;
  posts: PostInterface[];
  error: null | string;
}
