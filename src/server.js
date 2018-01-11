// Récupération des librairies de base permettant de faire un serveur d'API
const express = require("express");
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import favicon from "serve-favicon";
import mongoose from "mongoose";
import exphbs from "express-handlebars";

// Récupération du fichier de configuration qui dépend de l'environnement :
// - /config/dev.js si vous lancez l'application en local
// - /config/prod.js si vous lancez l'application sur votre serveur chez Heroku
import config from "./config";
import HandlebarsConfig from "./helpers/HandlebarsConfig";

// Récupération des controllers
import SeedDbController from "./controllers/SeedDbController";
import HomeController from "./controllers/HomeController";
import WordController from "./controllers/WordController";
import CategorieController from "./controllers/CategorieController";
import GrammarController from "./controllers/GrammarController";

// Configuration du serveur
const viewsPath = __dirname + '/views/';
const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(favicon(path.resolve('./src/assets/favicon.png')));

server.use(express.static(path.resolve('./src/assets')));
server.set('views', path.resolve('./src/views'));
server.engine('.hbs', exphbs(HandlebarsConfig));
server.set('view engine', '.hbs');

server.set('port', (process.env.PORT || 5000));
server.listen(server.get('port'), () => {
  console.log('Node app is running on port', server.get('port'));
});

// CROSS : cela permettra plus tard d'accéder aux API produites ici depuis l'appli mobile
// Voir ici pour plus d'info : https://developer.mozilla.org/fr/docs/HTTP/Access_control_CORS
server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Headers', 'Authorization,DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Connection à la base de donnée

mongoose.connect('mongodb://' + process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD + '@' + config.bddUri, {}, (err, res) => {
  if (err) {
    // La connection a échouée
    console.log('Mongo error:' + config.bddUri + '. ' + err);
  } else {
    // La connection a réussie
    console.log('Mongo success: ' + config.bddUri);
  }
});


// Routes pour initialiser la base
server.post('/seeddb', SeedDbController.seedDb);


// Routes pour les vues
server.get('/', HomeController.getIndex);

server.get('/words', WordController.getWords);
server.get('/words/id/:id', WordController.getWord);
server.get('/words/create', WordController.getCreateWord);
server.post('/words/create', WordController.postCreateWord);
server.get('/words/update/:id', WordController.getUpdateWord);
server.post('/words/update/:id', WordController.postUpdateWord);
server.get('/words/delete/:id', WordController.getDeleteWord);

server.get('/categories', CategorieController.getCategories);
server.get('/categories/id/:id', CategorieController.getCategorie);
server.get('/categories/create', CategorieController.getCreateCategorie);
server.post('/categories/create', CategorieController.postCreateCategorie);
server.get('/categories/update/:id', CategorieController.getUpdateCategorie);
server.post('/categories/update/:id', CategorieController.postUpdateCategorie);
server.get('/categories/delete/:id', CategorieController.getDeleteCategorie);

server.get('/grammars', GrammarController.getGrammars);
server.get('/grammars/id/:id', GrammarController.getGrammar);
server.get('/grammars/create', GrammarController.getCreateGrammar);
server.post('/grammars/create', GrammarController.postCreateGrammar);
server.get('/grammars/update/:id', GrammarController.getUpdateGrammar);
server.post('/grammars/update/:id', GrammarController.postUpdateGrammar);
server.get('/grammars/delete/:id', GrammarController.getDeleteGrammar);

// Routes pour les APIs
server.get('/api/', HomeController.getIndexApi);

server.get('/api/words', WordController.getWordsApi);
server.get('/api/words/id/:id', WordController.getWordApi);
server.post('/api/words/create', WordController.postCreateWordApi);
server.post('/api/words/update/:id', WordController.postUpdateWordApi);
server.post('/api/words/delete/:id', WordController.postDeleteWordApi);

server.get('/api/categories', CategorieController.getCategoriesApi);
server.get('/api/categories/id/:id', CategorieController.getCategorieApi);
server.post('/api/categories/create', CategorieController.postCreateCategorieApi);
server.post('/api/categories/update/:id', CategorieController.postUpdateCategorieApi);
server.post('/api/categories/delete/:id', CategorieController.postDeleteCategorieApi);

server.get('/api/grammars', GrammarController.getGrammarsApi);
server.get('/api/grammars/id/:id', GrammarController.getGrammarApi);
server.post('/api/grammars/create', GrammarController.postCreateGrammarApi);
server.post('/api/grammars/update/:id', GrammarController.postUpdateGrammarApi);
server.post('/api/grammars/delete/:id', GrammarController.postDeleteGrammarApi);
