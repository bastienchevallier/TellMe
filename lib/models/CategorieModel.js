"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise; // Model de la route '/categories'

var Schema = new _mongoose2.default.Schema({
  name: { type: String }, // le nom de la categorie
  image: { type: String } // l'url de l'image 
});

var Model = _mongoose2.default.model('Categorie', Schema);

exports.default = {
  getCategories: function getCategories() {
    return Model.find({}).exec();
  },

  getCategorie: function getCategorie(_id) {
    return Model.findOne({ _id: _id }).exec();
  },

  createCategorie: function createCategorie(categorie) {
    return Model.create({
      name: categorie.name,
      image: categorie.image
    });
  },

  updateCategorie: function updateCategorie(_id, categorie) {
    return Model.findOneAndUpdate({ _id: _id }, {
      name: categorie.name,
      image: categorie.image
    }, { upsert: true }).exec();
  },

  deleteCategories: function deleteCategories() {
    return Model.remove({}).exec();
  },

  deleteCategorie: function deleteCategorie(_id) {
    return Model.remove({ _id: _id }).exec();
  }
};