import { IncomingMessage, ServerResponse } from 'http';
import {
  urlNotFound,
  getUsers,
  createUser,
  getUserById,
} from '../controllers/userController';
import { URL, METHOD } from '../data/constants';

export function handleRequest(req: IncomingMessage, res: ServerResponse) {
  const { method, url } = req;

  res.setHeader('Content-Type', 'application/json');

  if (url && url === URL.users && method === METHOD.get) {
    getUsers(req, res);
  } else if (url && url.startsWith(URL.user_id) && method === METHOD.get) {
    const userId = url.split('/').pop();
    getUserById(req, res, userId);
  } else if (url && url === URL.users && method === METHOD.post) {
    createUser(req, res);
  } else {
    urlNotFound(req, res);
  }
}
