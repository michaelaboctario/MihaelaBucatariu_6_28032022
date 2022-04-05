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
            .catch((error) => res.status(400).json({ error: error.message }));
    } else {
        res.status(403).json({ error: 'Création non autorisée !' });
    }   
  };

  exports.getAllSauces = (req, res, next) => {
    Sauce.find()
      .then((sauces) => res.status(200).json(sauces))
      .catch((error) => res.status(400).json({ error: error.message }));
  };

  exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error: error.message }));
  };

  exports.deleteSauce = (req, res, next) => {
      Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        if (!sauce) {
          return res.status(404).json({ error: "Sauce non trouvée !" });
        }
  
        if (sauce.userId && sauce.userId !== req.auth.userId) {
          return res.status(403).json({ error: "Requête non autorisée !" });
        }
  
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(sauce =>
              res.status(200).json({ message: "Sauce supprimée !" })
            )
            .catch(error => res.status(400).json({ error: error.message }));
        });
      })
      .catch(error => res.status(400).json({ error: error.message }));
  };
  