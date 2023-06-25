import { IncomingMessage, ServerResponse } from 'http';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from '../models/types';
import { STATUS_CODE, MESSAGE } from '../data/constants';

const users: IUser[] = [];

export function getUsers(req: IncomingMessage, res: ServerResponse) {
  // throw new Error();
  res.statusCode = STATUS_CODE.success;
  res.end(JSON.stringify(users));
}

export function createUser(req: IncomingMessage, res: ServerResponse) {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    const { username, age, hobbies } = JSON.parse(body) as {
      username: string;
      age: number;
      hobbies: string[];
    };

    if (!username || !age || !hobbies) {
      res.statusCode = STATUS_CODE.bad_request;
      res.end(JSON.stringify({ message: MESSAGE.bad_request }));
    } else {
      const id = uuidv4();
      const newUser: IUser = { id, username, age, hobbies };
      users.push(newUser);

      res.statusCode = STATUS_CODE.created;
      res.end(JSON.stringify(newUser));
    }
  });
}

export function urlNotFound(req: IncomingMessage, res: ServerResponse) {
  res.statusCode = STATUS_CODE.not_found;
  res.end(JSON.stringify({ message: MESSAGE.not_found }));
}
