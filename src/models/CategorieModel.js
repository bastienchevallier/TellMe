// Model de la route '/categories'

import mongoose from "mongoose";
mongoose.Promise = global.Promise;

let Schema = new mongoose.Schema({
  name : { type: String },     // le nom de la categorie
  image : { type: String },    // l'url de l'image 
});

let Model = mongoose.model('Categorie', Schema);

export default {
  getCategories: () => {
    return Model.find({}).exec();
  },

  getCategorie: (_id) => {
    return Model.findOne({ _id }).exec();
  },

  createCategorie: (categorie) => {
    return Model.create({
      name: categorie.name,
      image : categorie.image,
    });
  },

  updateCategorie: (_id, categorie) => {
    return Model.findOneAndUpdate({ _id }, {
      name: categorie.name,
      image : categorie.image,
    }, {upsert: true}).exec();
  },

  deleteCategories: () => {
    return Model.remove({}).exec();
  },

  deleteCategorie: (_id) => {
    return Model.remove({ _id }).exec();
  },
};