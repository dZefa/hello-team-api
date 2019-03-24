import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

import { router } from './routes';
import { corsOptions } from './utils/cors';

const app = express();

// Set App Properties
app.set(`PORT`, process.env.PORT);

// Middlewares
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('short'));

// Routes
app.use('/api', router);

export { app };
