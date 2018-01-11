"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Errors = require("../helpers/Errors");

var _Errors2 = _interopRequireDefault(_Errors);

var _WordModel = require("../models/WordModel");

var _WordModel2 = _interopRequireDefault(_WordModel);

var _CategorieModel = require("../models/CategorieModel");

var _CategorieModel2 = _interopRequireDefault(_CategorieModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Récupération du model
exports.default = {
  seedDb: function seedDb(req, res) {
    return Promise.all([_WordModel2.default.deleteWords(), _CategorieModel2.default.deleteCategories()]).then(function (data) {
      return Promise.all([_WordModel2.default.seedWords()]);
    }).then(function (data) {
      res.send('ok');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  }
}; // Controller de la route '/shows'