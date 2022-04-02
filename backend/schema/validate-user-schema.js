const { body } = require('express-validator');

const schema = [
  body('email')
    .isEmail()
    .withMessage('l\'email doit contenir une adresse email correcte'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('le mot de passe doit être d\'une longueur minimale de 8 caractères'),
];

module.exports = schema;
