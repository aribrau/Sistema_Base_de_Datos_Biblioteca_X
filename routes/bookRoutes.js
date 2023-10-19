import express from 'express';
import {createBook, getBooksUnder300Pages} from '../controller/bookController.js'

const router = express.Router();
//inserta un nuevo registro en la tabla libro
router.post('/create-book', createBook);
//ruta para obtener la lista de libros con menos de 300 páginas
router.get('/get-books-under-300p', getBooksUnder300Pages)

export default router;