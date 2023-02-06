import { PersonInterface } from './../../models/person-interface';

export interface PersonStateInterface {
  isLoading: boolean;
  personData: PersonInterface[];
  error: null | string;
}
