import express from 'express';
import dotenv from 'dotenv';
import https from 'https';

import { productRouter } from './routes/productRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { customerRouter } from './routes/customerRoutes.js';
import { authRouter } from './routes/authRoutes.js';

dotenv.config();

const app = express();
const port = 6790;

app.use(express.json());
app.use(errorHandler);

app.use('/products', productRouter);
app.use('/customers', customerRouter);
app.use('/auth', authRouter);

const credentials = { 
  key: process.env.TLS_SERVER_KEY, 
  cert: process.env.TLS_SERVER_CERT
};
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, () => {
  console.log(`Server started on port ${port}`)
});

