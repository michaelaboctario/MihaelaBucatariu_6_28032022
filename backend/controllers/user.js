const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.signup = (req, res, next) => {
    //console.log("exports.signup");
    //console.log(req.body);
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ message: error.message }));
      })
      .catch(error => res.status(500).json({  message: error.message }));
  };

exports.login = (req, res, next) => {
  //console.log("exports.login");
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: 'TOKEN'
          });
        })
        .catch(error => res.status(500).json({ message: error.message }));
    })
};

exports.users = (req, res, next) => {
  console.log("exports.users");
  User.find()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json({ error }));
};