require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

console.log('Loaded MONGO_URI:', process.env.MONGO_URI);
if (!process.env.MONGO_URI) {
  console.error('Error: MONGO_URI is not defined in the environment variables.');
  process.exit(1);
}

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  dbName: 'petsocialmedia',
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

  app.use('/uploads', express.static('uploads'));
  
// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/user', userRoutes);

const groupRoutes = require('./routes/groupRoutes');
app.use('/api/groups', groupRoutes); 

const postRoutes = require('./routes/postRoutes');
app.use('/api/post', postRoutes); 

const lostFoundRoutes = require('./routes/lostFoundRoutes');
app.use('/api/lostfound', lostFoundRoutes);

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// browser testing
app.get('/', (req, res) => {
  res.send('API is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});