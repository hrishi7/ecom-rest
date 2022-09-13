import express from 'express';
import { createCatalog, getOrders } from '../Controller/seller/index';
import { protect } from '../Middleware/auth';

const router = express.Router();

router.post('/create-catalog', protect, createCatalog);
router.get('/orders', protect, getOrders);

export default router;
