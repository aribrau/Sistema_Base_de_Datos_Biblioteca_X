import express from 'express';
import {createLoan, getMostRequestedBook, getAllLoans, getLateFees} from '../controller/loanController.js'

const router = express.Router();
//ruta para crear un nuevo préstamo 
router.post('/create-loan', createLoan);
//ruta para obtener el libro más prestado
router.get('/get-most-requested-book', getMostRequestedBook)
//ruta para obtener el historial de préstamos
router.get('/get-all-loans', getAllLoans)
//ruta para obtener préstamos atrasados y calcular multa
router.get('/get-late-fees', getLateFees)

export default router;