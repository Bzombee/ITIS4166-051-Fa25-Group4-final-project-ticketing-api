import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from '../src/routes/authRoutes.js';
import userRoutes from '../src/routes/userRoutes.js';
import eventRoutes from '../src/routes/eventRoutes.js';
import ticketRoutes from '../src/routes/ticketRoutes.js';
import orderRoutes from '../src/routes/orderRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/orders', orderRoutes);

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
