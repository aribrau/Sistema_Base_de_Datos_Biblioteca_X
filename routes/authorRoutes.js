import express from 'express';
import { createAuthor, getAuthorsBornAfter1970 } from '../controller/authorController.js';

const router = express.Router();
//ruta para insertar un nuevo autor en la tabla author
router.post('/create-author', createAuthor);
//ruta para obtener los autores nacidos después de 1970
router.get('/get-author-born-before-1970', getAuthorsBornAfter1970)

export default router;