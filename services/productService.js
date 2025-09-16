import { db } from '../db/db.js';
import { Product } from '../models/product.js';

const getAll = async () => {
  const productDocs = await db.getAllInCollection(db.PRODUCTS);
  return productDocs.map(pDoc => Product.fromProductDocument(pDoc));
}

export const productService = {
  getAll
}