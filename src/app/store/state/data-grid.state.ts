import { Student } from '../../models/student.models'

export interface DataGridState {
  students: Student[]
  error: string | null
  isLoading: boolean
}