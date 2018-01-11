// Controller de la route '/shows'
import Errors from "../helpers/Errors";

// Récupération du model
import WordModel from "../models/WordModel";
import CategorieModel from "../models/CategorieModel";

export default {
  seedDb: (req, res) => {
    return Promise.all([
      WordModel.deleteWords(),
      CategorieModel.deleteCategories(),
    ])
    .then((data) => {
      return Promise.all([
        WordModel.seedWords(),
      ]);
    })
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },
};