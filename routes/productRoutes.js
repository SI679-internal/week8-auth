import express from 'express';
import { productControllers } from '../controllers/productControllers.js';

const productRouter = express.Router();

productRouter.get('/', productControllers.getProducts);
productRouter.get('/:id', productControllers.getProduct);
productRouter.post('/', productControllers.addProduct);
productRouter.patch('/:id', productControllers.updateProduct);
productRouter.delete('/:id', productControllers.deleteProduct);

export { productRouter };