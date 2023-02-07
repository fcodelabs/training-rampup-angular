import { PersonStateInterface } from './../store/state/personState';
import { UserStateInterface } from './../store/state/userState';

export interface AppStateInterface {
  personData: PersonStateInterface;
  user: UserStateInterface;
}
