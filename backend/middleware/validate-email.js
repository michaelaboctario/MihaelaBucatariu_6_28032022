const validator = require('validator');

module.exports = (req, res, next) => {
  if (!validator.isEmail(req.body.email)) {
    return res.status(400).json({ message: 'L\'addresse email n\'est pas valide !' });
  } else {
      next();
  }
};
