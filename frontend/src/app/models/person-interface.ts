export interface Person {
  PersonID: number
  PersonName?: string
  PersonGender?: string
  PersonAddress?: string
  PersonMobileNo?: string
  DateOfBirth?: Date
  PersonAge?: Number
  inEdit: boolean 
  locked?: boolean
  expanded?: boolean
  Discontinued?: boolean
}
export interface PageState {
  skip: number;
  take: number;
}
export interface User {
  UserID: number;
  Email: string;
  Role:string;
}
export class Product {
    public ProductID: number | undefined;
    public ProductName = '';
    public Discontinued? = false;
    public UnitsInStock?: number;
    public UnitPrice = 0;
    public Category = {
        CategoryID: 0,
        CategoryName: ''
    };
}