import { app } from './app';
import { syncDB } from './utils/db';

app.listen(app.get(`PORT`), () => {
  console.log(`Listening on PORT: ${app.get('PORT')}. In environment: ${process.env.NODE_ENV}.`);

  syncDB();
});
