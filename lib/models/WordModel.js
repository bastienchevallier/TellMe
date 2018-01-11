"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _WordSeeds = require("../helpers/WordSeeds");

var _WordSeeds2 = _interopRequireDefault(_WordSeeds);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise; // Model de la route '/words'

var Schema = new _mongoose2.default.Schema({
  name: { type: String }, // le nom du concert
  id_cat: { type: String }, // l'id de la catégorie 
  id_gram: { type: String }, // l'id de la nature grammaticale
  image: { type: String // l'url de l'image
  } });

var Model = _mongoose2.default.model('Word', Schema);

exports.default = {
  seedWords: function seedWords() {
    var promises = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _WordSeeds2.default[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var word = _step.value;

        promises[promises.legth] = Model.create(word);
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

    return Promise.all(promises);
  },

  getWords: function getWords() {
    return Model.find({}).exec();
  },

  getWord: function getWord(_id) {
    return Model.findOne({ _id: _id }).exec();
  },

  createWord: function createWord(word) {
    return Model.create({
      name: word.name,
      id_cat: word.id_cat,
      id_gram: word.id_gram,
      image: word.image
    });
  },

  updateWord: function updateWord(_id, word) {
    return Model.findOneAndUpdate({ _id: _id }, {
      name: word.name,
      id_cat: word.id_cat,
      id_gram: word.id_gram,
      image: word.image
    }, { upsert: true }).exec();
  },

  deleteWords: function deleteWords() {
    return Model.remove({}).exec();
  },

  deleteWord: function deleteWord(_id) {
    return Model.remove({ _id: _id }).exec();
  }
};