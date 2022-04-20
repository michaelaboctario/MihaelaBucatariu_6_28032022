const passwordValidator = require("password-validator");

module.exports = (req, res, next) => {
  const schema = new passwordValidator();

  schema
    .is().min(8) 
    .is().max(20) 
    .has().uppercase(1) 
    .has().lowercase(1) 
    .has().digits(1) 
    .has().symbols(1)  
    .has().not().spaces();

  if (!schema.validate(req.body.password)) {
    return res.status(400).json({ message:
        'Mot de passe non valide: entre 8 et 20 caractères, doit contenir une majuscule, une minuscule, un symbol, un chiffre et sans espace !',
    });
  } else {
      next();
  }
};
