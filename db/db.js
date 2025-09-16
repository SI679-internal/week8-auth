import { MongoClient, ObjectId } from "mongodb";

const mongoURI = 'mongodb://127.0.0.1:27017';
const dbName = 'week4';

let mongoClient = null;
let theDb = null;

const PRODUCTS = 'products'; // coll name

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

export const db = {
  init, 
  getAllInCollection, 
  PRODUCTS
}