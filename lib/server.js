"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require("cookie-parser");

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _serveFavicon = require("serve-favicon");

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _expressHandlebars = require("express-handlebars");

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

var _HandlebarsConfig = require("./helpers/HandlebarsConfig");

var _HandlebarsConfig2 = _interopRequireDefault(_HandlebarsConfig);

var _SeedDbController = require("./controllers/SeedDbController");

var _SeedDbController2 = _interopRequireDefault(_SeedDbController);

var _HomeController = require("./controllers/HomeController");

var _HomeController2 = _interopRequireDefault(_HomeController);

var _WordController = require("./controllers/WordController");

var _WordController2 = _interopRequireDefault(_WordController);

var _CategorieController = require("./controllers/CategorieController");

var _CategorieController2 = _interopRequireDefault(_CategorieController);

var _GrammarController = require("./controllers/GrammarController");

var _GrammarController2 = _interopRequireDefault(_GrammarController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Configuration du serveur
// Récupération des librairies de base permettant de faire un serveur d'API
var viewsPath = __dirname + '/views/';

// Récupération des controllers


// Récupération du fichier de configuration qui dépend de l'environnement :
// - /config/dev.js si vous lancez l'application en local
// - /config/prod.js si vous lancez l'application sur votre serveur chez Heroku

var server = (0, _express2.default)();
server.use(_bodyParser2.default.json());
server.use(_bodyParser2.default.urlencoded({ extended: true }));
server.use((0, _cookieParser2.default)());
server.use((0, _serveFavicon2.default)(_path2.default.resolve('./src/assets/favicon.png')));

server.use(_express2.default.static(_path2.default.resolve('./src/assets')));
server.set('views', _path2.default.resolve('./src/views'));
server.engine('.hbs', (0, _expressHandlebars2.default)(_HandlebarsConfig2.default));
server.set('view engine', '.hbs');

server.set('port', process.env.PORT || 5000);
server.listen(server.get('port'), function () {
  console.log('Node app is running on port', server.get('port'));
});

// CROSS : cela permettra plus tard d'accéder aux API produites ici depuis l'appli mobile
// Voir ici pour plus d'info : https://developer.mozilla.org/fr/docs/HTTP/Access_control_CORS
server.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Headers', 'Authorization,DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Connection à la base de donnée

_mongoose2.default.connect('mongodb://' + process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD + '@' + _config2.default.bddUri, {}, function (err, res) {
  if (err) {
    // La connection a échouée
    console.log('Mongo error:' + _config2.default.bddUri + '. ' + err);
  } else {
    // La connection a réussie
    console.log('Mongo success: ' + _config2.default.bddUri);
  }
});

// Routes pour initialiser la base
server.post('/seeddb', _SeedDbController2.default.seedDb);

// Routes pour les vues
server.get('/', _HomeController2.default.getIndex);

server.get('/words', _WordController2.default.getWords);
server.get('/words/id/:id', _WordController2.default.getWord);
server.get('/words/create', _WordController2.default.getCreateWord);
server.post('/words/create', _WordController2.default.postCreateWord);
server.get('/words/update/:id', _WordController2.default.getUpdateWord);
server.post('/words/update/:id', _WordController2.default.postUpdateWord);
server.get('/words/delete/:id', _WordController2.default.getDeleteWord);

server.get('/categories', _CategorieController2.default.getCategories);
server.get('/categories/id/:id', _CategorieController2.default.getCategorie);
server.get('/categories/create', _CategorieController2.default.getCreateCategorie);
server.post('/categories/create', _CategorieController2.default.postCreateCategorie);
server.get('/categories/update/:id', _CategorieController2.default.getUpdateCategorie);
server.post('/categories/update/:id', _CategorieController2.default.postUpdateCategorie);
server.get('/categories/delete/:id', _CategorieController2.default.getDeleteCategorie);

server.get('/grammars', _GrammarController2.default.getGrammars);
server.get('/grammars/id/:id', _GrammarController2.default.getGrammar);
server.get('/grammars/create', _GrammarController2.default.getCreateGrammar);
server.post('/grammars/create', _GrammarController2.default.postCreateGrammar);
server.get('/grammars/update/:id', _GrammarController2.default.getUpdateGrammar);
server.post('/grammars/update/:id', _GrammarController2.default.postUpdateGrammar);
server.get('/grammars/delete/:id', _GrammarController2.default.getDeleteGrammar);

// Routes pour les APIs
server.get('/api/', _HomeController2.default.getIndexApi);

server.get('/api/words', _WordController2.default.getWordsApi);
server.get('/api/words/id/:id', _WordController2.default.getWordApi);
server.post('/api/words/create', _WordController2.default.postCreateWordApi);
server.post('/api/words/update/:id', _WordController2.default.postUpdateWordApi);
server.post('/api/words/delete/:id', _WordController2.default.postDeleteWordApi);

server.get('/api/categories', _CategorieController2.default.getCategoriesApi);
server.get('/api/categories/id/:id', _CategorieController2.default.getCategorieApi);
server.post('/api/categories/create', _CategorieController2.default.postCreateCategorieApi);
server.post('/api/categories/update/:id', _CategorieController2.default.postUpdateCategorieApi);
server.post('/api/categories/delete/:id', _CategorieController2.default.postDeleteCategorieApi);

server.get('/api/grammars', _GrammarController2.default.getGrammarsApi);
server.get('/api/grammars/id/:id', _GrammarController2.default.getGrammarApi);
server.post('/api/grammars/create', _GrammarController2.default.postCreateGrammarApi);
server.post('/api/grammars/update/:id', _GrammarController2.default.postUpdateGrammarApi);
server.post('/api/grammars/delete/:id', _GrammarController2.default.postDeleteGrammarApi);