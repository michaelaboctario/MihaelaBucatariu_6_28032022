//Sauce
const Sauce = require('../models/sauce');

// Handle create sauce on POST.
exports.sauceCreate = function (req, res, next) {
    // Process request after validation and sanitisation.
    // Extract the validation errors from a request.
    // const errors = validationResult(req);

    // Create a Sauce object 
    //console.log(req.body.sauce);
    const sauceObject = JSON.parse(req.body.sauce);
    //console.log(sauceObject);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject, 
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        userLiked: [''],
        userDisliked: [''],
    });

    // if sauce userId equal to userId from connexion token
    if (sauce.userId === req.auth.userId) {
        sauce.save() 
            .then((sauce) => res.status(201).json({ message: 'Sauce enregistrée!' }))
            .catch((error) => res.status(400).json({ message: error.message }));
    } else {
        res.status(403).json({ message: 'Création non autorisée!' });
    }   
  };

  exports.getAllSauces = (req, res, next) => {
    Sauce.find()
      .then((sauces) => res.status(200).json(sauces))
      .catch((error) => res.status(400).json({ message: error.message }));
  };
