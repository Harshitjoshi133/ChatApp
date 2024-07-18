const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const socket = require('socket.io');
const userRoutes = require('./routes/userRoute');
const messageRoutes = require('./routes/messageRoutes');
require('dotenv').config();

const app = express();
const PORT=process.env.PORT;


const corsOptions = {
   origin: '*',
   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
   credentials: true,
   optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/messages', messageRoutes);

const mongoURI = process.env.MONGO_URL;
mongoose.connect(mongoURI, {})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const server = app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});

const io = socket(server, {
    cors: {
        origin: '*', // Update with your frontend origin
        credentials: true,
        transports: ['websocket', 'polling'],
        allowedHeaders: ['Content-Type'],
        optionSuccessStatus:200,
    },
    allowEIO3: true
});

global.onlineUsers = new Map();

io.on('connection', (socket) => {
    global.chatSocket = socket;
    console.log(`A user is on the socket ${socket.id}`);
    socket.on('add-users', (userId) => {

        onlineUsers.set(userId, socket.id);
        console.log(`the user id is set${userId}`);
    });
    socket.on('send-msg', (data) => {
        const sendUserSocket = onlineUsers.get(data.to);

        if (sendUserSocket) {
            socket.to(sendUserSocket).emit('msg-recieve', data.message);

            console.log(`data is send from ${data.from} to ${data.to}`);
        }
    });
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
        // Handle user disconnection logic if needed
    });
});
