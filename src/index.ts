import { createServer, IncomingMessage, ServerResponse } from 'http';
import dotenv from 'dotenv';
import { handleRequest } from './routes/requestHandler';
import { STATUS_CODE, MESSAGE } from './data/constants';

dotenv.config();
const port = process.env.PORT || 3000;

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  try {
    handleRequest(req, res);
  } catch (error) {
    res.statusCode = STATUS_CODE.internal_error;
    res.end(JSON.stringify({ message: MESSAGE.internal_error }));
  }
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
