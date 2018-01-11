// Model de la route '/grammars'

import mongoose from "mongoose";
mongoose.Promise = global.Promise;

let Schema = new mongoose.Schema({
  name : { type: String },     // le nom de la catégorie grammaticale
});

let Model = mongoose.model('Grammar', Schema);

export default {
  getGrammars: () => {
    return Model.find({}).exec();
  },

  getGrammar: (_id) => {
    return Model.findOne({ _id }).exec();
  },

  createGrammar: (grammar) => {
    return Model.create({
      name: grammar.name,
    });
  },

  updateGrammar: (_id, grammar) => {
    return Model.findOneAndUpdate({ _id }, {
      name: grammar.name,
    }, {upsert: true}).exec();
  },

  deleteGrammars: () => {
    return Model.remove({}).exec();
  },

  deleteGrammar: (_id) => {
    return Model.remove({ _id }).exec();
  },
};