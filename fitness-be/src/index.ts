import express from 'express';
import cors from 'cors'
import RoutePaths from './controllers';
import { createServer } from 'node:http';
import 'dotenv/config';

const server = express();
const PORT = process.env.PORT as string;

server.use(cors());
server.use(express.json());
server.use(RoutePaths);

const http = createServer(server);

http.listen(PORT, () => {
    console.log(`${process.env.NAME} Server is listening on the PORT ${PORT}`);
})
