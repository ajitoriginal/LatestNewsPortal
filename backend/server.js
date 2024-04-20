// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors', {})
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use(express.json());
app.use(cors({origin: '*'}))

// Routes
app.use('/api/news', require('./routes/news'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
