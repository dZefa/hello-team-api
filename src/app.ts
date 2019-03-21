import express from 'express';

const app = express();

// Set App Properties
app.set(`PORT`, process.env.PORT);

export { app };
