import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './src/routes/router.js';
import sequelize from './src/config/db.config.js';
import errorHandler from './src/middlewares/errorHandler.middleware.js';

const app = express();
const PORT = process.env.BACKEND_PORT || 8080;
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/api', routes);
app.get('/', (_, res) => res.send('Hello Backend Here!'));

app.use(errorHandler);

(async () => {
  await sequelize.sync({ alter: true }); // 👈 sync models
  app.listen(PORT, () => {
    console.log(`🔥 Server listening at http://localhost:${PORT}`);
  });
})();
