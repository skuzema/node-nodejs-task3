import { IncomingMessage, ServerResponse } from 'http';

export function handleRequest(req: IncomingMessage, res: ServerResponse) {
  res.setHeader('Content-Type', 'application/json');
  res.writeHead(200);
  res.end('Empty user list');
}
