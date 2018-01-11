// Controller de la route '/grammars'
import _ from "lodash";
import Errors from "../helpers/Errors";

// Récupération du model
import WordModel from "../models/WordModel";
import CategorieModel from "../models/CategorieModel";
import GrammarModel from "../models/GrammarModel";

const grammars = () => {
  // On fait appel à la fonction getGrammars du model
  // Celle ci renvoie tous les grammars présents en base
  return GrammarModel.getGrammars()
  .then((data) => {
    // On récupère ici data qui est une liste de grammars

    if (data === null) {
      // Si data est vide, nous renvoyons l'erreur 'noWordsError'
      throw new Error('noGrammarsError');
    }

    // On prépare ici la réponse que va renvoyer l'api, il s'agit d'un tableau
    let response = [];
    for (let grammar of data){
      // On parcours data. pour chaque élément
      response[response.length] = {
        id: grammar._id,
        name: grammar.name,
      }
    }

    // Avant d'envoyer la réponse on la tri par ordre alphabétique croissant sur le champs name
    return _.sortBy(response, 'name');
  });
}

const grammar = (_id) => {
  // On fait appel à la fonction getWord du model
  // Celle ci renvoie le word dont l'id est _id
  return GrammarModel.getGrammar(_id)
  .then((data) => {
    // On récupère ici data qui est une liste de words

    if (data === null) {
      // Si data est vide, nous renvoyons l'erreur 'noWordError'
      throw new Error('noGrammarError');
    }

    // On prépare ici la réponse que va renvoyer l'api, il s'agit d'un élement
    let response = {
      id: data._id,
      name: data.name,
    };
    return response;
  });
}

const createGrammar = (grammar) => {
  // On fait appel à la fonction createGrammar du model
  // Celle ci renvoie le mot dont l'id est _id
  return GrammarModel.createGrammar(grammar);
}

const updateGrammar = (id, grammar) => {
  // On fait appel à la fonction updateGrammar du model
  // Celle ci renvoie le mot dont l'id est _id
  return GrammarModel.updateGrammar(id, grammar);
}

const deleteGrammar = (id) => {
  // On fait appel à la fonction deleteGrammar du model
  // Celle ci renvoie le mot dont l'id est _id
  return GrammarModel.deleteGrammar(id);
}

export default {
  // Controller des views
  getGrammars: (req, res) => {
    grammars()
    .then((data) => {
      // data contient une liste de grammars
      res.render('grammar/grammars', { grammars: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getGrammar: (req, res) => {
    grammar(req.params.id)
    .then((data) => {
      res.render('grammar/grammar', { grammar: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getCreateGrammar: (req, res) => {
    res.render('grammar/createGrammar');
  },

  postCreateGrammar: (req, res) => {
    let grammar = {
      name: req.body.name,
    };
    createGrammar(grammar)
    .then((data) => {
      res.redirect('/grammars');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getUpdateGrammar: (req, res) => {
    show(req.params.id)
    .then((data) => {
      res.render('grammar/updateGrammar', { grammar : data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postUpdateGrammar: (req, res) => {
    let Grammar = {
      name: req.body.name,
    };

    updateGrammar(req.params.id, grammar)
    .then((data) => {
      res.redirect('/grammars');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getDeleteGrammar: (req, res) => {
    deleteGrammar(req.params.id)
    .then((data) => {
      res.redirect('/grammars');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  // ************ API FROM THERE ************ //

  // Controller des Apis
  getGrammarsApi: (req, res) => {
    grammars()
    .then((data) => {
      // data contient maintenant la valeur retournée par la fonction _.sortBy
      // Si les opérations précédentes se sont bien passées, l'api renvoie une liste de grammars
      res.send(data);
    }, (err) => {
      // Si une erreur a été renvoyée avec la fonctions throw new Error(), nous atterrissons ici
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getGrammarApi: (req, res) => {
    word(req.params.id)
    .then((data) => {
      res.send(data);
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postCreateGrammarApi: (req, res) => {
    let grammar = {
      name: req.body.name,

    };

    createGrammar(grammar)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postUpdateGrammarApi: (req, res) => {
    let grammar = {
      name: req.body.name,
    };

    updateGrammar(req.params.id, grammar)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postDeleteGrammarApi: (req, res) => {
    deleteGrammar(req.params.id)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },
};
