import express from 'express';
import userRoutes from './userRoutes.js';
import authorRoutes from './authorRoutes.js';
import bookRoutes from './bookRoutes.js';
import bookAuthorRoutes from './bookAuthorRoutes.js';
import loanRoutes from './loanRoutes.js';

const router = express.Router();

router.use('/user', userRoutes);
router.use('/author', authorRoutes);
router.use('/book', bookRoutes);
router.use('/book-author', bookAuthorRoutes);
router.use('/loan', loanRoutes);

export default router;