"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise; // Model de la route '/grammars'

var Schema = new _mongoose2.default.Schema({
  name: { type: String } // le nom de la catégorie grammaticale
});

var Model = _mongoose2.default.model('Grammar', Schema);

exports.default = {
  getGrammars: function getGrammars() {
    return Model.find({}).exec();
  },

  getGrammar: function getGrammar(_id) {
    return Model.findOne({ _id: _id }).exec();
  },

  createGrammar: function createGrammar(grammar) {
    return Model.create({
      name: grammar.name
    });
  },

  updateGrammar: function updateGrammar(_id, grammar) {
    return Model.findOneAndUpdate({ _id: _id }, {
      name: grammar.name
    }, { upsert: true }).exec();
  },

  deleteGrammars: function deleteGrammars() {
    return Model.remove({}).exec();
  },

  deleteGrammar: function deleteGrammar(_id) {
    return Model.remove({ _id: _id }).exec();
  }
};