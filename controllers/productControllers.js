
import { productService } from '../services/productService.js';

const getProducts = async (req, res) => {
  const allProducts = await productService.getAll();
  res.json(allProducts);
}

const getProduct = async (req, res) => {
  const { id } = req.params;
  const theProduct = await productService.getById(id);
  res.json(theProduct);
}

const addProduct = async (req, res) => {
  const postData = req.body;
  const { id } = await productService.add(postData);
  res.json({ id });
}

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { deletedCount } = await productService.deleteIt(id);
  res.json({deletedCount});
}

export const productControllers = {
  getProducts,
  getProduct,
  addProduct,
  deleteProduct
}