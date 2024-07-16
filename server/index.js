// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const socket = require('socket.io');
const userRoutes = require('./routes/userRoute');
const messageRoutes = require('./routes/messageRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5500;

// CORS options
const corsOptions = {
  origin: 'https://chat-app-tan-six-70.vercel.app', // Your frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 200,
};

// Enable CORS
app.use(cors(corsOptions));

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/messages', messageRoutes);

// MongoDB connection
const mongoURI = process.env.MONGO_URL;
mongoose.connect(mongoURI, {})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Start server
const server = app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});

// Socket.io setup
const io = socket(server, {
  cors: {
    origin: 'https://chat-app-tan-six-70.vercel.app', // Your frontend URL
    credentials: true,
    optionSuccessStatus: 200,
  },
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
