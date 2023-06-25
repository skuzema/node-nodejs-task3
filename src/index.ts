import { createServer, IncomingMessage, ServerResponse } from 'http';
import dotenv from 'dotenv';
import { handleRequest } from './routes/requestHandler';

dotenv.config();
const port = process.env.PORT || 3000;

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  handleRequest(req, res);
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
