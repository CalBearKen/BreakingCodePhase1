// server.js
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const AWS = require('aws-sdk');
const apiRoutes = require('./routes/api');
require('dotenv').config();

// Initialize AWS S3
AWS.config.update({ region: process.env.AWS_REGION });

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middlewares
app.use(cors());
app.use(bodyParser.json());
// Connecting to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error(err));

// Socket.IO integration
io.on('connection', (socket) => {
    console.log('A new client connected');
    socket.on('disconnect', () => {
        console.log('A client disconnected');
    });
});

// Routes
app.use('/api', apiRoutes);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));