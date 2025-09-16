
import { productService } from '../services/productService.js';

const getProducts = async (req, res) => {
  const allProducts = await productService.getAll();
  res.json(allProducts);
}

const addProduct = async (req, res) => {
  const postData = req.body;
  const { id } = await productService.add(postData);
  res.json({ id });
}

export const productControllers = {
  getProducts,
  addProduct
}