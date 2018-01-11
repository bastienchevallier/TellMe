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

var grammars = function grammars() {
  // On fait appel à la fonction getGrammars du model
  // Celle ci renvoie tous les grammars présents en base
  return _GrammarModel2.default.getGrammars().then(function (data) {
    // On récupère ici data qui est une liste de grammars

    if (data === null) {
      // Si data est vide, nous renvoyons l'erreur 'noWordsError'
      throw new Error('noGrammarsError');
    }

    // On prépare ici la réponse que va renvoyer l'api, il s'agit d'un tableau
    var response = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _grammar = _step.value;

        // On parcours data. pour chaque élément
        response[response.length] = {
          id: _grammar._id,
          name: _grammar.name
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
// Controller de la route '/grammars'


var grammar = function grammar(_id) {
  // On fait appel à la fonction getWord du model
  // Celle ci renvoie le word dont l'id est _id
  return _GrammarModel2.default.getGrammar(_id).then(function (data) {
    // On récupère ici data qui est une liste de words

    if (data === null) {
      // Si data est vide, nous renvoyons l'erreur 'noWordError'
      throw new Error('noGrammarError');
    }

    // On prépare ici la réponse que va renvoyer l'api, il s'agit d'un élement
    var response = {
      id: data._id,
      name: data.name
    };
    return response;
  });
};

var createGrammar = function createGrammar(grammar) {
  // On fait appel à la fonction createGrammar du model
  // Celle ci renvoie le mot dont l'id est _id
  return _GrammarModel2.default.createGrammar(grammar);
};

var updateGrammar = function updateGrammar(id, grammar) {
  // On fait appel à la fonction updateGrammar du model
  // Celle ci renvoie le mot dont l'id est _id
  return _GrammarModel2.default.updateGrammar(id, grammar);
};

var deleteGrammar = function deleteGrammar(id) {
  // On fait appel à la fonction deleteGrammar du model
  // Celle ci renvoie le mot dont l'id est _id
  return _GrammarModel2.default.deleteGrammar(id);
};

exports.default = {
  // Controller des views
  getGrammars: function getGrammars(req, res) {
    grammars().then(function (data) {
      // data contient une liste de grammars
      res.render('grammar/grammars', { grammars: data });
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  getGrammar: function getGrammar(req, res) {
    grammar(req.params.id).then(function (data) {
      res.render('grammar/grammar', { grammar: data });
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  getCreateGrammar: function getCreateGrammar(req, res) {
    res.render('grammar/createGrammar');
  },

  postCreateGrammar: function postCreateGrammar(req, res) {
    var grammar = {
      name: req.body.name
    };
    createGrammar(grammar).then(function (data) {
      res.redirect('/grammars');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  getUpdateGrammar: function getUpdateGrammar(req, res) {
    show(req.params.id).then(function (data) {
      res.render('grammar/updateGrammar', { grammar: data });
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  postUpdateGrammar: function postUpdateGrammar(req, res) {
    var Grammar = {
      name: req.body.name
    };

    updateGrammar(req.params.id, grammar).then(function (data) {
      res.redirect('/grammars');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  getDeleteGrammar: function getDeleteGrammar(req, res) {
    deleteGrammar(req.params.id).then(function (data) {
      res.redirect('/grammars');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  // ************ API FROM THERE ************ //

  // Controller des Apis
  getGrammarsApi: function getGrammarsApi(req, res) {
    grammars().then(function (data) {
      // data contient maintenant la valeur retournée par la fonction _.sortBy
      // Si les opérations précédentes se sont bien passées, l'api renvoie une liste de grammars
      res.send(data);
    }, function (err) {
      // Si une erreur a été renvoyée avec la fonctions throw new Error(), nous atterrissons ici
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  getGrammarApi: function getGrammarApi(req, res) {
    word(req.params.id).then(function (data) {
      res.send(data);
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  postCreateGrammarApi: function postCreateGrammarApi(req, res) {
    var grammar = {
      name: req.body.name

    };

    createGrammar(grammar).then(function (data) {
      res.send('ok');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  postUpdateGrammarApi: function postUpdateGrammarApi(req, res) {
    var grammar = {
      name: req.body.name
    };

    updateGrammar(req.params.id, grammar).then(function (data) {
      res.send('ok');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  postDeleteGrammarApi: function postDeleteGrammarApi(req, res) {
    deleteGrammar(req.params.id).then(function (data) {
      res.send('ok');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  }
};