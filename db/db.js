import { MongoClient, ObjectId } from "mongodb";

const mongoURI = 'mongodb://127.0.0.1:27017';
const dbName = 'week4';

let mongoClient = null;
let theDb = null;

// coll names
const PRODUCTS = 'products'; 
const ORDERS = 'orders';

const init = async () => {
  mongoClient = new MongoClient(mongoURI);
  await mongoClient.connect();
  theDb = mongoClient.db(dbName);
}

const getAllInCollection = async (collectionName) => {
  if (!mongoClient) { await init(); }
  const allDocs = await theDb.collection(collectionName).find();
  return allDocs.toArray();
}

const addToCollection = async (collectionName, docData) => {
  if (!mongoClient) { await init(); }
  const result = await theDb.collection(collectionName).insertOne(docData);
  return result;
}

export const db = {
  init, 
  getAllInCollection, 
  addToCollection,
  PRODUCTS,
  ORDERS
}