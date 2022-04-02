const express = require('express');
const mongoose = require('mongoose');

// mongoose models
const User = require('./models/user');
const authRoutes = require('./routes/user');

const app = express();
app.use(express.json());

const {MONGO_DB, MONGO_USER, MONGO_PASSWORD}=process.env; 
const mongo_uri=`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.fimqt.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`
//console.log(mongo_uri);

mongoose.connect(mongo_uri,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  // use routes
  app.use('/api/auth', authRoutes);
  module.exports = app;