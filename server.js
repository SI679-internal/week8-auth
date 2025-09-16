import express from 'express';
import { productRouter } from './routes/productRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';


const app = express();
const port = 6790;
app.use(express.json());
app.use(errorHandler);
app.use('/products', productRouter);

app.listen(port);