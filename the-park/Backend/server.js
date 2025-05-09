const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

if (!process.env.MONGO_URI) {
  console.error('Error: MONGO_URI is not defined in the environment variables.');
  process.exit(1);
}

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  dbName: 'petsocialmedia',
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/user', userRoutes);

const groupRoutes = require('./routes/groupRoutes');
app.use('/api/groups', groupRoutes); 

const postRoutes = require('./routes/postRoutes');
app.use('/api/post', postRoutes); 

// browser testing
app.get('/', (req, res) => {
  res.send('API is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});