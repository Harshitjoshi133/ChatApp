const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const socket = require('socket.io');
const userRoutes = require('./routes/userRoute');
const messageRoutes = require('./routes/messageRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000; // Added default port

// CORS Configuration
const corsOptions = {
    origin: '*', // For production, specify your frontend URL here.
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'], // Add any other headers you need to allow
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json()); // Middleware to parse JSON bodies

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/messages', messageRoutes);

// MongoDB Connection
const mongoURI = process.env.MONGO_URL;
mongoose.connect(mongoURI, {
    useNewUrlParser: true, // Use new URL parser
    useUnifiedTopology: true, // Use new server discovery and monitoring engine
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err)); // Improved error logging

// Start server
const server = app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});

// Socket.io Configuration
const io = socket(server, {
    cors: {
        origin: '*', // Update with your frontend origin
        credentials: true,
        transports: ['websocket', 'polling'],
        allowedHeaders: ['Content-Type', 'Authorization'], // Add any other headers you need to allow
        optionsSuccessStatus: 200,
    },
    allowEIO3: true, // Enable support for older Socket.IO clients
});

global.onlineUsers = new Map();

io.on('connection', (socket) => {
    global.chatSocket = socket;
    console.log(`A user is connected: ${socket.id}`);

    // Add user to online users map
    socket.on('add-users', (userId) => {
        onlineUsers.set(userId, socket.id);
        console.log(`User ${userId} added with socket ID ${socket.id}`);
    });

    // Handle message sending
    socket.on('send-msg', (data) => {
        const sendUserSocket = onlineUsers.get(data.to);

        if (sendUserSocket) {
            socket.to(sendUserSocket).emit('msg-recieve', data.message);
            console.log(`Message sent from ${data.from} to ${data.to}: ${data.message}`);
        } else {
            console.log(`User ${data.to} is not online`);
        }
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
        for (let [key, value] of onlineUsers.entries()) {
            if (value === socket.id) {
                onlineUsers.delete(key);
                break;
            }
        }
    });
});
