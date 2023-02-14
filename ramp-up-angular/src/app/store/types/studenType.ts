import { studentDetails } from 'src/app/models/studentDetails';
export interface studentData{
    students:studentDetails[],
     error: string | null;
}