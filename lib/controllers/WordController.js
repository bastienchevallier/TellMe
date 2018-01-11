"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _Errors = require("../helpers/Errors");

var _Errors2 = _interopRequireDefault(_Errors);

var _WordModel = require("../models/WordModel");

var _WordModel2 = _interopRequireDefault(_WordModel);

var _CategorieModel = require("../models/CategorieModel");

var _CategorieModel2 = _interopRequireDefault(_CategorieModel);

var _GrammarModel = require("../models/GrammarModel");

var _GrammarModel2 = _interopRequireDefault(_GrammarModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var words = function words() {
  // On fait appel à la fonction getWords du model
  // Celle ci renvoie tous les words présents en base
  return _WordModel2.default.getWords().then(function (data) {
    // On récupère ici data qui est une liste de words

    if (data === null) {
      // Si data est vide, nous renvoyons l'erreur 'noWordsError'
      throw new Error('noWordsError');
    }

    // On prépare ici la réponse que va renvoyer l'api, il s'agit d'un tableau
    var response = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _word = _step.value;

        // On parcours data. pour chaque élément
        response[response.length] = {
          id: _word._id,
          name: _word.name,
          id_cat: _word.id_cat,
          id_gram: _word.id_gram,
          image: _word.image
        };
      }

      // Avant d'envoyer la réponse on la tri par ordre alphabétique croissant sur le champs name
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return _lodash2.default.sortBy(response, 'name');
  });
};

// Récupération du model
// Controller de la route '/words'

var word = function word(_id) {
  // On fait appel à la fonction getWord du model
  // Celle ci renvoie le word dont l'id est _id
  return _WordModel2.default.getWord(_id).then(function (data) {
    // On récupère ici data qui est une liste de words

    if (data === null) {
      // Si data est vide, nous renvoyons l'erreur 'noWordError'
      throw new Error('noWordError');
    }

    // On prépare ici la réponse que va renvoyer l'api, il s'agit d'un élement
    var response = {
      id: data._id,
      name: data.name,
      id_cat: data.id_cat,
      id_gram: data.id_gram,
      image: data.image
    };
    return response;
  });
};

var createWord = function createWord(word) {
  // On fait appel à la fonction createWord du model
  // Celle ci renvoie le mot dont l'id est _id
  return _WordModel2.default.createWord(word);
};

var updateWord = function updateWord(id, word) {
  // On fait appel à la fonction updateWord du model
  // Celle ci renvoie le mot dont l'id est _id
  return _WordModel2.default.updateWord(id, word);
};

var deleteWord = function deleteWord(id) {
  // On fait appel à la fonction deleteWord du model
  // Celle ci renvoie le mot dont l'id est _id
  return _WordModel2.default.deleteWord(id);
};

exports.default = {
  // Controller des views
  getWords: function getWords(req, res) {
    words().then(function (data) {
      // data contient une liste de words
      res.render('word/words', { words: data });
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  getWord: function getWord(req, res) {
    word(req.params.id).then(function (data) {
      res.render('word/word', { word: data });
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  getCreateWord: function getCreateWord(req, res) {
    _CategorieModel2.default.getCategories().then(function (data) {
      _GrammarModel2.default.getGrammars().then(function (data_2) {
        res.render('word/createWord', { categories: data, grammars: data_2 });
      }, function (err_2) {
        console.log(err_2);
        res.status((0, _Errors2.default)(err_2).code).send((0, _Errors2.default)(err_2));
      });
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  postCreateWord: function postCreateWord(req, res) {
    var word = {
      name: req.body.name,
      id_cat: req.body.id_cat,
      id_gram: req.body.id_gram,
      image: req.body.image
    };

    createWord(word).then(function (data) {
      res.redirect('/words');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  getUpdateWord: function getUpdateWord(req, res) {
    show(req.params.id).then(function (data) {
      res.render('word/updateWord', { word: data });
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  postUpdateWord: function postUpdateWord(req, res) {
    var word = {
      name: req.body.name,
      id_cat: req.body.id_cat,
      id_gram: req.body.id_gram,
      image: req.body.image
    };

    updateShow(req.params.id, word).then(function (data) {
      res.redirect('/words');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  getDeleteWord: function getDeleteWord(req, res) {
    deleteWord(req.params.id).then(function (data) {
      res.redirect('/words');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  // ************ API FROM THERE ************ //

  // Controller des Apis
  getWordsApi: function getWordsApi(req, res) {
    words().then(function (data) {
      // data contient maintenant la valeur retournée par la fonction _.sortBy
      // Si les opérations précédentes se sont bien passées, l'api renvoie une liste de words
      res.send(data);
    }, function (err) {
      // Si une erreur a été renvoyée avec la fonctions throw new Error(), nous atterrissons ici
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  getWordApi: function getWordApi(req, res) {
    word(req.params.id).then(function (data) {
      res.send(data);
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  postCreateWordApi: function postCreateWordApi(req, res) {
    var word = {
      name: req.body.name,
      id_cat: req.body.id_cat,
      id_gram: req.body.id_gram,
      image: req.body.image
    };

    createShow(word).then(function (data) {
      res.send('ok');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  postUpdateWordApi: function postUpdateWordApi(req, res) {
    var word = {
      name: req.body.name,
      id_cat: req.body.id_cat,
      id_gram: req.body.id_gram,
      image: req.body.image
    };

    updateWord(req.params.id, word).then(function (data) {
      res.send('ok');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  postDeleteWordApi: function postDeleteWordApi(req, res) {
    deleteWord(req.params.id).then(function (data) {
      res.send('ok');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  }
};