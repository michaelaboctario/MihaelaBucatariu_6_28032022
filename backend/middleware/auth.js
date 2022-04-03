const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    //console.log(process.env.RANDOM_SECRET_TOKEN);
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.RANDOM_SECRET_TOKEN);
      const userId = decodedToken.userId;
      req.auth = { userId: userId };
      if (req.body.userId && req.body.userId !== userId) {
        throw 'Invalid user ID';
    } else {
        next();
    }
  } catch {
      res.status(401).json({
        message: 'Invalid request!'
    });
  }
};