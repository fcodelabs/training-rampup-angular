export interface Student {
    id?: number
    name: string
    gender:string
    address: string
    mobileNo:string
    dateOfBirth:string|Date
    age:number
}

export enum Gender{
    MALE='Male',
    FEMALE='Female'
}