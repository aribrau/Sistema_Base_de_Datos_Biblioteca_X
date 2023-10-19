import express from 'express';
import { createBookAuthor } from '../controller/bookAuthorController.js';

const router = express.Router();
//ruta asociacion libro-autor-tipoautor
router.post('/create-book-author', createBookAuthor);

export default router;