import express from 'express';
import { createCatalog, getOrders } from '../Controller/seller/index';
import { protect } from '../Middleware/auth';
import { validateCreateCatalogRequest } from '../Validation/seller';

const router = express.Router();

router.post('/create-catalog', protect, validateCreateCatalogRequest, createCatalog);
router.get('/orders', protect, getOrders);

export default router;
