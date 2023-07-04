import { IncomingMessage, ServerResponse } from 'http';
import { v4 as uuidv4, validate as uuid_validate } from 'uuid';
import { IUser, IUserDto } from '../models/types';
import { STATUS_CODE, MESSAGE } from '../data/constants';
import { utils } from '../utils';

const users: IUser[] = [];

export function getUsers(req: IncomingMessage, res: ServerResponse) {
  // throw new Error();
  res.statusCode = STATUS_CODE.success;
  res.end(JSON.stringify(users));
}

export function getUserById(
  req: IncomingMessage,
  res: ServerResponse,
  userId: string | undefined
) {
  if (!userId || !uuid_validate(userId)) {
    res.statusCode = STATUS_CODE.bad_request;
    res.end(JSON.stringify({ message: MESSAGE.invalid_uuid }));
  } else {
    const user = users.find((u) => u.id === userId);

    if (!user) {
      res.statusCode = STATUS_CODE.not_found;
      res.end(JSON.stringify({ message: MESSAGE.user_not_found }));
    } else {
      res.statusCode = STATUS_CODE.success;
      res.end(JSON.stringify(user));
    }
  }
}

export function createUser(req: IncomingMessage, res: ServerResponse) {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    try {
      const { username, age, hobbies } = JSON.parse(body) as IUserDto;
      if (!username || !age || !hobbies) {
        res.statusCode = STATUS_CODE.bad_request;
        res.end(JSON.stringify({ message: MESSAGE.bad_request }));
      } else if (utils.chkUserFields(username, age, hobbies)) {
        res.statusCode = STATUS_CODE.bad_request;
        res.end(JSON.stringify({ message: MESSAGE.invalid_data }));
      } else {
        const id = uuidv4();
        const newUser: IUser = { id, username, age, hobbies };
        users.push(newUser);

        res.statusCode = STATUS_CODE.created;
        res.end(JSON.stringify(newUser));
      }
    } catch (error) {
      res.statusCode = STATUS_CODE.bad_request;
      res.end(JSON.stringify({ message: MESSAGE.invalid_data }));
    }
  });
}

export function updateUser(
  req: IncomingMessage,
  res: ServerResponse,
  userId: string | undefined
) {
  if (!userId || !uuid_validate(userId)) {
    res.statusCode = STATUS_CODE.bad_request;
    res.end(JSON.stringify({ message: MESSAGE.invalid_uuid }));
  } else {
    const userIndex = users.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      res.statusCode = STATUS_CODE.not_found;
      res.end(JSON.stringify({ message: MESSAGE.user_not_found }));
    } else {
      let body = '';

      req.on('data', (chunk) => {
        body += chunk;
      });

      req.on('end', () => {
        try {
          const { username, age, hobbies } = JSON.parse(body) as IUserDto;
          if (!username || !age || !hobbies) {
            res.statusCode = STATUS_CODE.bad_request;
            res.end(JSON.stringify({ message: MESSAGE.bad_request }));
          } else if (utils.chkUserFields(username, age, hobbies)) {
            res.statusCode = STATUS_CODE.bad_request;
            res.end(JSON.stringify({ message: MESSAGE.invalid_data }));
          } else {
            const updatedUser: IUser = { id: userId, username, age, hobbies };
            users[userIndex] = updatedUser;

            res.statusCode = STATUS_CODE.success;
            res.end(JSON.stringify(updatedUser));
          }
        } catch (error) {
          res.statusCode = STATUS_CODE.bad_request;
          res.end(JSON.stringify({ message: MESSAGE.invalid_data }));
        }
      });
    }
  }
}

export function deleteUser(
  req: IncomingMessage,
  res: ServerResponse,
  userId: string | undefined
) {
  if (!userId || !uuid_validate(userId)) {
    res.statusCode = STATUS_CODE.bad_request;
    res.end(JSON.stringify({ message: MESSAGE.invalid_uuid }));
  } else {
    const userIndex = users.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      res.statusCode = STATUS_CODE.not_found;
      res.end(JSON.stringify({ message: MESSAGE.user_not_found }));
    } else {
      users.splice(userIndex, 1);
      res.statusCode = STATUS_CODE.no_content;
      res.end();
    }
  }
}

export function urlNotFound(req: IncomingMessage, res: ServerResponse) {
  res.statusCode = STATUS_CODE.not_found;
  res.end(JSON.stringify({ message: MESSAGE.not_found }));
}
