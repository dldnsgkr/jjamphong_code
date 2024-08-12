import express, { Request, Response } from 'express';
import connection from '@server/db';

const app = express();
const port = 4000; // <- 3000에서 다른 숫자로 변경

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
