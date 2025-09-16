
import { productService } from '../services/productService.js';

const getProducts = async (req, res) => {
  const allProducts = await productService.getAll();
  res.json(allProducts);
}

export const productControllers = {
  getProducts
}