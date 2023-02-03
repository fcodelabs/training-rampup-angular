import { UserInterface } from './../../models/user-interface';

export interface UserStateInterface {
 isLoading: boolean;
  user: UserInterface|null;
 error: null | string;
}
