"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _Errors = require("../helpers/Errors");

var _Errors2 = _interopRequireDefault(_Errors);

var _CategorieModel = require("../models/CategorieModel");

var _CategorieModel2 = _interopRequireDefault(_CategorieModel);

var _WordModel = require("../models/WordModel");

var _WordModel2 = _interopRequireDefault(_WordModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Récupération du model
// Controller de la route '/categories'
var categories = function categories() {
  return _CategorieModel2.default.getCategories().then(function (data) {
    if (data === null) {
      throw new Error('noCategoriesError');
    }

    var response = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _categorie = _step.value;

        response[response.length] = {
          id: _categorie._id,
          name: _categorie.name,
          image: _categorie.image
        };
      }
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

var categorie = function categorie(_id) {
  return _CategorieModel2.default.getCategorie(_id).then(function (data) {
    if (data === null) {
      throw new Error('noCategorieError');
    }

    var response = {
      id: categorie._id,
      name: categorie.name,
      image: categorie.image
    };
    return response;
  });
};

var createCategorie = function createCategorie(Categorie) {
  return _CategorieModel2.default.createCategorie(Categorie);
};

var updateCategorie = function updateCategorie(id, Categorie) {
  return _CategorieModel2.default.updateCategorie(id, Categorie);
};

var deleteCategorie = function deleteCategorie(id) {
  return _CategorieModel2.default.deleteCategorie(id);
};

exports.default = {
  // Controller des views
  getCategories: function getCategories(req, res) {
    categories().then(function (data) {
      res.render('categorie/categories', { categories: data });
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  getCategorie: function getCategorie(req, res) {
    categorie(req.params.id).then(function (data) {
      res.render('categorie/categorie', { categorie: data });
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  getCreateCategorie: function getCreateCategorie(req, res) {
    _WordModel2.default.getWords().then(function (data) {
      res.render('categorie/createCategorie', { words: data });
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  postCreateCategorie: function postCreateCategorie(req, res) {
    var categorie = {
      name: req.body.name,
      image: req.body.image
    };

    createCategorie(categorie).then(function (data) {
      res.redirect('/categories');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  getUpdateCategorie: function getUpdateCategorie(req, res) {
    Promise.all([categorie(req.params.id), _WordModel2.default.getWords()]).then(function (data) {
      res.render('categorie/updateCategorie', { categorie: data[0], words: data[1] });
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  postUpdateCategorie: function postUpdateCategorie(req, res) {
    var categorie = {
      name: req.body.name,
      image: req.body.image
    };

    updateCategorie(req.params.id, categorie).then(function (data) {
      res.redirect('/categories');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  getDeleteCategorie: function getDeleteCategorie(req, res) {
    deleteCategorie(req.params.id).then(function (data) {
      res.redirect('/categories');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  // Controller des Apis
  getCategoriesApi: function getCategoriesApi(req, res) {
    categories().then(function (data) {
      res.send(data);
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  getCategorieApi: function getCategorieApi(req, res) {
    categorie(req.params.id).then(function (data) {
      res.send(data);
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  postCreateCategorieApi: function postCreateCategorieApi(req, res) {
    var categorie = {
      name: req.body.name,
      image: req.body.image
    };

    createCategorie(categorie).then(function (data) {
      res.send('ok');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  postUpdateCategorieApi: function postUpdateCategorieApi(req, res) {
    var categorie = {
      name: req.body.name,
      image: req.body.image
    };

    updateCategorie(req.params.id, categorie).then(function (data) {
      res.send('ok');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  postDeleteCategorieApi: function postDeleteCategorieApi(req, res) {
    deleteCategorie(req.params.id).then(function (data) {
      res.send('ok');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  }
};