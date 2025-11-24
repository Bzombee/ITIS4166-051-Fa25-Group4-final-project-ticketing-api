import express from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUI from 'swagger-ui-express'
import YAML from  'yamljs'
import path from "path";
import 'dotenv/config';
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.set('trust proxy', 1);
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);
import 'dotenv/config';

if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRES_IN) {
  throw new Error('JWT_SECRET or JWT_EXPIRES_IN is missing in environment variables');
}


const yamlPath = path.join(__dirname, "../public/bundled.yaml");
const specs = YAML.load(yamlPath);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/orders', orderRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  if (!err.status) {
    console.log(err.stack);
    err.status = 500;
    err.message = 'Internal Server Error';
  }
  res.status(err.status).json({ error: err.message });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
