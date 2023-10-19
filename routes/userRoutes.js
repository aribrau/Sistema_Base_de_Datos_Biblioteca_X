import express from 'express';
import {createUser} from '../controller/userController.js'

const router = express.Router();
//ruta para crear usuario
router.post('/create-user', createUser);

export default router;