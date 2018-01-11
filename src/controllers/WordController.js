// Controller de la route '/words'

import _ from "lodash";
import Errors from "../helpers/Errors";

// Récupération du model
import WordModel from "../models/WordModel";
import CategorieModel from "../models/CategorieModel";
import GrammarModel from "../models/GrammarModel";

const words = () => {
  // On fait appel à la fonction getWords du model
  // Celle ci renvoie tous les words présents en base
  return WordModel.getWords()
  .then((data) => {
    // On récupère ici data qui est une liste de words

    if (data === null) {
      // Si data est vide, nous renvoyons l'erreur 'noWordsError'
      throw new Error('noWordsError');
    }

    // On prépare ici la réponse que va renvoyer l'api, il s'agit d'un tableau
    let response = [];
    for (let word of data){
      // On parcours data. pour chaque élément
      response[response.length] = {
        id: word._id,
        name: word.name,
        id_cat : word.id_cat,
        id_gram : word.id_gram,
        image : word.image,
      }
    }

    // Avant d'envoyer la réponse on la tri par ordre alphabétique croissant sur le champs name
    return _.sortBy(response, 'name');
  });
}

const word = (_id) => {
  // On fait appel à la fonction getWord du model
  // Celle ci renvoie le word dont l'id est _id
  return WordModel.getWord(_id)
  .then((data) => {
    // On récupère ici data qui est une liste de words

    if (data === null) {
      // Si data est vide, nous renvoyons l'erreur 'noWordError'
      throw new Error('noWordError');
    }

    // On prépare ici la réponse que va renvoyer l'api, il s'agit d'un élement
    let response = {
      id: data._id,
      name: data.name,
      id_cat : data.id_cat,
      id_gram : data.id_gram,
      image : data.image,
    };
    return response;
  });
}

const createWord = (word) => {
  // On fait appel à la fonction createWord du model
  // Celle ci renvoie le mot dont l'id est _id
  return WordModel.createWord(word);
}

const updateWord = (id, word) => {
  // On fait appel à la fonction updateWord du model
  // Celle ci renvoie le mot dont l'id est _id
  return WordModel.updateWord(id, word);
}

const deleteWord = (id) => {
  // On fait appel à la fonction deleteWord du model
  // Celle ci renvoie le mot dont l'id est _id
  return WordModel.deleteWord(id);
}

export default {
  // Controller des views
  getWords: (req, res) => {
    words()
    .then((data) => {
      // data contient une liste de words
      res.render('word/words', { words: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getWord: (req, res) => {
    word(req.params.id)
    .then((data) => {
      res.render('word/word', { word: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getCreateWord: (req, res) => {
    CategorieModel.getCategories()
    .then((data) => {
      GrammarModel.getGrammars()
      .then((data_2) => {
        res.render('word/createWord', { categories: data, grammars: data_2 });
      }, (err_2) => {
        console.log(err_2);
        res.status(Errors(err_2).code).send(Errors(err_2));
      });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postCreateWord: (req, res) => {
    let word = {
      name: req.body.name,
      id_cat : req.body.id_cat,
      id_gram : req.body.id_gram,
      image : req.body.image
    };

    createWord(word)
    .then((data) => {
      res.redirect('/words');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getUpdateWord: (req, res) => {
    show(req.params.id)
    .then((data) => {
      res.render('word/updateWord', { word: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postUpdateWord: (req, res) => {
    let word = {
      name: req.body.name,
      id_cat : req.body.id_cat,
      id_gram : req.body.id_gram,
      image : req.body.image
    };

    updateShow(req.params.id, word)
    .then((data) => {
      res.redirect('/words');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getDeleteWord: (req, res) => {
    deleteWord(req.params.id)
    .then((data) => {
      res.redirect('/words');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  // ************ API FROM THERE ************ //

  // Controller des Apis
  getWordsApi: (req, res) => {
    words()
    .then((data) => {
      // data contient maintenant la valeur retournée par la fonction _.sortBy
      // Si les opérations précédentes se sont bien passées, l'api renvoie une liste de words
      res.send(data);
    }, (err) => {
      // Si une erreur a été renvoyée avec la fonctions throw new Error(), nous atterrissons ici
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getWordApi: (req, res) => {
    word(req.params.id)
    .then((data) => {
      res.send(data);
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postCreateWordApi: (req, res) => {
    let word = {
      name: req.body.name,
      id_cat : req.body.id_cat,
      id_gram : req.body.id_gram,
      image : req.body.image
    };

    createShow(word)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postUpdateWordApi: (req, res) => {
    let word = {
      name: req.body.name,
      id_cat : req.body.id_cat,
      id_gram : req.body.id_gram,
      image : req.body.image
    };

    updateWord(req.params.id, word)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postDeleteWordApi: (req, res) => {
    deleteWord(req.params.id)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },
};
