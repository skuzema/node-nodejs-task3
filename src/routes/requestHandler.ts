import { IncomingMessage, ServerResponse } from 'http';
import { urlNotFound, getUsers } from '../controllers/userController';
import { URL } from '../data/constants';

export function handleRequest(req: IncomingMessage, res: ServerResponse) {
  const { method, url } = req;

  res.setHeader('Content-Type', 'application/json');

  if (url && url === URL.users && method === 'GET') {
    getUsers(req, res);
  } else {
    urlNotFound(req, res);
  }
}
