const { body } = require('express-validator');
const { passwordValidator } = require('express-validator');
const schema = [
  body('email')
    .isEmail()
    .withMessage('l\'email doit contenir une adresse email correcte'),
  body('password').isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
      pointsPerUnique: 1,
      pointsPerRepeat: 0.5,
      pointsForContainingLower: 10,
      pointsForContainingUpper: 10,
      pointsForContainingNumber: 10,
      pointsForContainingSymbol: 10,
    })
  .withMessage('le mot de passe doit contenir une majuscule, une minuscule, un chiffre et un caractère spécial'),
  ];

module.exports = schema;
