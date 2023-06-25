import { IncomingMessage, ServerResponse } from 'http';
import { IUser } from '../models/types';
import { RESPONSE, MESSAGE } from '../data/constants';

const users: IUser[] = [];

export function getUsers(req: IncomingMessage, res: ServerResponse) {
  res.statusCode = RESPONSE.success;
  res.end(JSON.stringify(users));
}

export function urlNotFound(req: IncomingMessage, res: ServerResponse) {
  res.statusCode = RESPONSE.not_found;
  res.end(JSON.stringify({ message: MESSAGE.not_found }));
}
