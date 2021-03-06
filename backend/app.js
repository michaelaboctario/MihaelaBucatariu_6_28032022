const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

// routes
const authRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');
// path package for working with file paths
const path = require("path");

// express application
const app = express();
app.use(express.json());

const {MONGO_DB, MONGO_USER, MONGO_PASSWORD}=process.env; 
const mongo_uri=`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.fimqt.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`

mongoose.connect(mongo_uri,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
   
  // helmet for securin the Express app by setting HTTP headers
  app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  // Use to limit repeated requests to public APIs and/or endpoints such as password reset
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
  // Apply the rate limiting middleware to all requests
  app.use(limiter);
  
  // replace $ and . characters (which are reserved for use by MongoDB as operators) with _  
  app.use(
    mongoSanitize({
      replaceWith: '_',
    }),
  );

  // path for images folder
  app.use("/images", express.static(path.join(__dirname, "images")));

  // use routes
  app.use('/api/auth', authRoutes);
  app.use('/api/sauces', sauceRoutes);
  module.exports = app;