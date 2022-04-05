//Sauce
const Sauce = require('../models/sauce');
const fs = require('fs');

const LIKE = 1;
const DISLIKE = -1;
const REVERTLIKE = 0;

const updateLikesList = (sauce, userId) => { 
  const {usersLiked, usersDisliked} = sauce;
  if (usersDisliked.includes(userId)) {
    throw new Error('Merci d\'annuler votre dislike avant de liker !');
  }
  else if (usersLiked.includes(userId)) {
    throw new Error('Un seul like possible !');
  } else {
    usersLiked.push(userId); 
  }
}

const updateDislikesList = (sauce, userId) => { 
  const {usersLiked, usersDisliked} = sauce;
  if (usersLiked.includes(userId)) {
    throw new Error('Merci d\'annuler votre like avant de disliker !');
  }
  else if (usersDisliked.includes(userId)) {
    throw new Error('Un seul dislike possible !');
  } else {
    usersDisliked.push(userId); 
  }
}

const revertLike = (sauce, userId) => { 
  const {usersLiked, usersDisliked} = sauce;
  if (usersLiked.includes(userId)) {
    usersLiked.filter(user => user !== userId);
  }
  else if (usersDisliked.includes(userId)) {
    usersDisliked.filter(user => user !== userId);
  }
}

// Handle create sauce on POST.
exports.sauceCreate = function (req, res, next) {
    const sauceObject = JSON.parse(req.body.sauce);
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
      .then(sauce => {
        if (!sauce) {
          return res.status(404).json({ error: 'Sauce non trouvée !' });
        }
        else if (sauce.userId && sauce.userId !== req.auth.userId) {
          return res.status(403).json({ error: 'Requête non autorisée !' });
        }
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(sauce =>
              res.status(200).json({ message: 'Sauce supprimée !'})
            )
            .catch(error => res.status(400).json({ error: error.message }));
        });
      })
      .catch(error => res.status(400).json({ error: error.message }));
  };
  
exports.updateSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then(sauce => {
      if (!sauce) {
        return res.status(404).json({ error: 'Sauce non trouvée !' });
      }
      else if (req.body.userId && req.body.userId !== sauce.userId) {
        res.status(401).json({ error: 'Modification non autorisée !' });
      }
      else {
        if(req.file) {
          const filename = sauce.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, error => {
            if (error) {
              throw new Error(error);
            }
          });
        }
        const sauceObject = req.file ? {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
          } : { 
            ...req.body 
        };
        Sauce.updateOne(
          { _id: req.params.id },
          { ...sauceObject, _id: req.params.id }
        )
          .then(sauce =>
            res.status(200).json({ message: 'La sauce a été notée !' })
          )
          .catch(error => res.status(400).json({error: error.message}));
      };   
  })
};

exports.likeSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const likeAction = req.body.like;
      const {userId} = req.body;

      switch (likeAction) {
        case LIKE:
          updateLikesList(sauce, userId);
          break;

        case DISLIKE:
          updateDislikesList(sauce, userId);
          break;

        case REVERTLIKE:
          revertLike(sauce, userId);         
          break;

        default:
          throw new Error('Action like invalide !');
      }

      //calcul du numero total de likes et dislikes
      sauce.likes = sauce.usersLiked.length;
      sauce.dislikes = sauce.usersDisliked.length;

      //mettre à jour la base de donées 
      Sauce.updateOne({ _id: req.params.id }, sauce)
        .then((sauce) => res.status(200).json({ message: 'Sauce like/dislike mis à jour !' }))
        .catch((error) => res.status(400).json({ error: error.message }));
    })
};
