const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const socket = require('socket.io');
const userRoutes = require('./routes/userRoute');
const messageRoutes = require('./routes/messageRoutes');
require('dotenv').config();

const app = express();

const corsOptions = {
   origin: 'http://localhost:5173',
   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
   credentials: true,
   optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/messages', messageRoutes);

const mongoURI = process.env.MONGO_URL;
mongoose.connect(mongoURI, {})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const server = app.listen(process.env.PORT, () => {
    console.log(`Listening on PORT ${process.env.PORT}`);
});

const io = socket(server, {
    cors: {
        origin: 'http://localhost:5173', // Update with your frontend origin
        credentials: true,
        optionSuccessStatus:200,
    }
});

global.onlineUsers = new Map();

io.on('connection', (socket) => {
    global.chatSocket = socket;
    socket.on('add-users', (userId) => {
        onlineUsers.set(userId, socket.id);
    });
    socket.on('send-msg', (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit('msg-recieve', data.message);
        }
    });
});
