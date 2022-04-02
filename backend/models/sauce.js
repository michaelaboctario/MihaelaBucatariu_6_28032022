
// userId : String — l'identifiant MongoDB unique de l'utilisateur qui a créé la
// sauce
// ● name : String — nom de la sauce
// ● manufacturer : String — fabricant de la sauce
// ● description : String — description de la sauce
// ● mainPepper : String — le principal ingrédient épicé de la sauce
// ● imageUrl : String — l'URL de l'image de la sauce téléchargée par l'utilisateur
// ● heat : Number — nombre entre 1 et 10 décrivant la sauce
// ● likes : Number — nombre d'utilisateurs qui aiment (= likent) la sauce
// ● dislikes : Number — nombre d'utilisateurs qui n'aiment pas (= dislike) la
// sauce
// ● usersLiked : [ "String <userId>" ] — tableau des identifiants des utilisateurs
// qui ont aimé (= liked) la sauce
// ● usersDisliked : [ "String <userId>" ] — tableau des identifiants des
// utilisateurs qui n'ont pas aimé (= disliked) la sauce

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sauceSchema = mongoose.Schema({
    userId : { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, min: 1, max: 10, required: true },
    likes: { type: Number, required: true },
    dislikes: { type: Number, required: true },
    usersLiked: { type: [Schema.Types.ObjectId], required: true },
    usersDisliked: { type: [Schema.Types.ObjectId], required: true }
});

module.exports = mongoose.model('Sauce', sauceSchema);