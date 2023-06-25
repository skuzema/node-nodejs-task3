import { IncomingMessage, ServerResponse } from 'http';
import { IUser } from '../models/types';

const users: IUser[] = [];

export function getUsers(req: IncomingMessage, res: ServerResponse) {
  res.statusCode = 200;
  res.end(JSON.stringify(users));
}
