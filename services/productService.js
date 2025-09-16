import { db } from '../db/db.js';
import { Product } from '../models/product.js';

const getAll = async () => {
  const productDocs = await db.getAllInCollection(db.PRODUCTS);
  return productDocs.map(pDoc => Product.fromProductDocument(pDoc));
}

const add = async (productInfo) => {
  const {insertedId} = await db.addToCollection(db.PRODUCTS, productInfo);
  return {
    id: insertedId.toString(),
    ...productInfo
  }
}

export const productService = {
  getAll, 
  add
}