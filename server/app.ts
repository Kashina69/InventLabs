import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';
import cors from 'cors';

const app = express();
const port = process.env.BACKEND_PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json('Hello Backend Here!');
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
