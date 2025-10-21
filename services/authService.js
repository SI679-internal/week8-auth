import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { db } from '../db/db.js';
import { User } from '../models/user.js';

const SALT_ROUNDS = 11;

let jwtSecretKey, jwtPublicKey;

const registerUser = async (username, password) => {
  // 1. check if username already exists, error if yes
  const user = await db.getFromCollectionByFieldValue(db.USERS, 'username', username);
  if (user) {
    throw new Error('username already exists');
  }

  // 2. hash password
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // 3. save user record
  const result = await db.addToCollection(db.USERS, {
    username, 
    hashedPassword
  });

  if (!result.acknowledged || !result.insertedId) {
    throw new Error ('error adding user to DB');
  }

  return; 
}

const loadKeys = () => {
  jwtSecretKey = process.env.JWT_PRIVATE_KEY;
  jwtPublicKey = process.env.JWT_PUBLIC_KEY;
}

const generateToken = (userId) => {
  loadKeys(); // do this lazily to give dotenv a chance to set up
  let data = {
      time: Date(),
      userId
  }
  return jwt.sign(data, jwtSecretKey, { algorithm: 'RS256', expiresIn: '1h' });
}

const validateLogin = async (username, password) => {

  const userDoc = await db.getFromCollectionByFieldValue(db.USERS, 'username', username);
  if (!userDoc) {
    throw new Error('username not found.');
  }

  const user = User.fromUserDocument(userDoc);  
  const result = await bcrypt.compare(password, user.hashedPassword);
  if (result) {
    const jwt = generateToken(user.id);
    user.jwt = jwt;
    delete user.hashedPassword;
    return user;
  } else {
    throw new Error('invalid password');
  }
}

export const authService = {
  registerUser, validateLogin
}