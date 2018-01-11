// Model de la route '/words'

import mongoose from "mongoose";
mongoose.Promise = global.Promise;

import WordSeeds from "../helpers/WordSeeds";

let Schema = new mongoose.Schema({
  name: { type: String },          // le nom du concert
  id_cat : { type: String },      // l'id de la catégorie 
  id_gram : { type: String },     // l'id de la nature grammaticale
  image: { type: String }         // l'url de l'image
});

let Model = mongoose.model('Word', Schema);

export default {
  seedWords: () => {
    let promises = [];
    for (let word of WordSeeds){
      promises[promises.legth] = Model.create(word);
    }
    return Promise.all(promises);
  },

  getWords: () => {
    return Model.find({}).exec();
  },

  getWord: (_id) => {
    return Model.findOne({ _id }).exec();
  },

  createWord: (word) => {
    return Model.create({
      name: word.name,
      id_cat : word.id_cat,
      id_gram : word.id_gram,
      image : word.image,
    });
  },

  updateWord: (_id, word) => {
    return Model.findOneAndUpdate({ _id }, {
      name: word.name,
      id_cat : word.id_cat,
      id_gram : word.id_gram,
      image : word.image,
    }, {upsert: true}).exec();
  },

  deleteWords: () => {
    return Model.remove({}).exec();
  },

  deleteWord: (_id) => {
    return Model.remove({ _id }).exec();
  },
};