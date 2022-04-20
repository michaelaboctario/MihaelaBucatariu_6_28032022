# MihaelaBucatariu_6_28032022

P6 Développeur Web Openclassrooms
Construisez une API sécurisée pour une application d'avis gastronomiques
## Il faut travailler dans le dossier "backend"

```bash
cd backend
```
## Technologies utilisées

Node, Express, MongoDB 

## Le projet utilise aussi les packages, disponibles sur npm  :

bcrypt, dotenv, express-mongo-sanitize, express-rate-limit, helmet, jsonwebtoken
mongoose, mongoose-unique-validator, multer, password-validator, path, validator

## Variables d'environnement

Avant de lancer le projet, renommer le fichier .env-template en .env et modifier les variables d'environnement suivantes, en fonction de vos paramètres  de connexion sur la base MongoDB

MONGO_USER=""
MONGO_PASSWORD=""

Ajouter aussi une chaine dans la variable 
RANDOM_SECRET_TOKEN=""

Un dossier "images" (vide) doit également être présent à la racine du projet 

## Installation du backend

### Installer les dépendances

```bash
npm install
```

### Démarrer le serveur

```bash
node server.js
```

