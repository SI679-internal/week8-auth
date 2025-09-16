import express from 'express';
import { productControllers } from '../controllers/productControllers.js';

const productRouter = express.Router();

productRouter.get('/', productControllers.getProducts);

export { productRouter };