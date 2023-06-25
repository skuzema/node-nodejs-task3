import { createServer, IncomingMessage, ServerResponse } from 'http';
import dotenv from 'dotenv';
import os from 'node:os';
import cluster from 'node:cluster';
import { handleRequest } from './routes/requestHandler';
import { STATUS_CODE, MESSAGE } from './data/constants';

dotenv.config();
const port = process.env.PORT || '3000';
const numCPUs = os.cpus().length;

cluster.SCHED_RR;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`worker ${worker.process.pid} died`);
  });

  cluster.on('listening', (worker, address) => {
    console.log(
      `A worker is now connected to ${address.address}:${address.port}`
    );
  });
} else {
  const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    try {
      handleRequest(req, res);
    } catch (error) {
      res.statusCode = STATUS_CODE.internal_error;
      res.end(JSON.stringify({ message: MESSAGE.internal_error }));
    }
  });

  server.listen(port, () => {
    console.log(`Worker ${cluster?.worker?.id} listening on port ${port}`);
  });
}
