import dotenv from 'dotenv'
import mongoose from "mongoose";
import word from './common/routes/word.routes'
import room from './common/routes/room.routes'
import wordScript from './common/scripts/categoryWiseWordsAddingScript'
import bodyParser from "body-parser";
import express from "express";
import {createServer} from "node:http";
import {Server} from "socket.io";
import handleSocketEvents from "./socket";

const socketApp = express();
const server = createServer(socketApp)
export const io = new Server(server, {
    cors: ['http://localhost:3000']
});

server.listen(8001, () => {
    console.log('Server running on port 8001!')
})

io.on('connection', (socket) => {
    handleSocketEvents(socket, io);
});


dotenv.config();

const app = new express();


const uri = process.env.MONGO_URL;

async function connectDb() {
    try {
        await mongoose.connect(uri);
        console.log('DB Connection Open');
    } catch (e) {
        console.log(e)
    }
}

connectDb();

app.use(bodyParser.json({limit: '20mb'}));
app.use(bodyParser.urlencoded({limit: '20mb', extended: false}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,x-token, Access-Control-Allow-Credentials');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use("*", (req, res, next) => {
    const { hostname, originalUrl, protocol, method } = req;
    console.log(
        `${
            method
        }  ${protocol}://${hostname}:8102${originalUrl}`
    );
    next();
});

app.use('/api/words', word);
app.use('/api/rooms', room);
app.use('/api/wordScript', wordScript);


app.listen(8102, (error) => {
    if (!error) {
        console.log(`API is running on port: 8102! Build something amazing!`);
    }
})
