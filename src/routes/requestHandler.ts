import { IncomingMessage, ServerResponse } from 'http';
import { getUsers } from '../controllers/userController';

export function handleRequest(req: IncomingMessage, res: ServerResponse) {
  const { method, url } = req;

  res.setHeader('Content-Type', 'application/json');

  if (url && url === '/api/users' && method === 'GET') {
    getUsers(req, res);
  }
}
