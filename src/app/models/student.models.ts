export interface Student {
    id: number
    name: string
    gender:Gender
    address: string
    mobileNo:string
    dateOfBirth:Date
    age:number
}

export enum Gender{
    MALE='Male',
    FEMALE='Female'
}