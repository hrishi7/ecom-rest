import express from 'express';
import { getListOfSellers, getSellerCatalog, createOrder } from '../Controller/buyer/index';
import { protect } from '../Middleware/auth';

const router = express.Router();

router.get('/list-of-sellers', getListOfSellers);
router.get('/seller-catalog/:sellerId', getSellerCatalog);
router.post('/create-order/:sellerId', protect, createOrder);

export default router;
