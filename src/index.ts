import { app } from './app';

app.listen(app.get(`PORT`), () => {
  console.log(`Listening on PORT: ${app.get('PORT')}. In environment: ${process.env.NODE_ENV}.`);
});
