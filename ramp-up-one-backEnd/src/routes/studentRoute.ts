import express from 'express';
import {
  getAllStudent,
  saveStudent,
  updateStudent,
  deleteStudent,
} from '../controllers/studentController';
const route = express.Router();
route.get('/', getAllStudent);
route.post('/', saveStudent);
route.patch('/', updateStudent);
route.delete('/:ID', deleteStudent);

export default route;
 

