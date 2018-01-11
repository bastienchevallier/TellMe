// Controller de la route '/categories'
import _ from "lodash";
import Errors from "../helpers/Errors";

// Récupération du model
import CategorieModel from "../models/CategorieModel";
import WordModel from "../models/WordModel";

const categories = () => {
  return CategorieModel.getCategories()
  .then((data) => {
    if (data === null) {
      throw new Error('noCategoriesError');
    }

    let response = [];
    for (let categorie of data){
      response[response.length] = {
        id: categorie._id,
        name: categorie.name,
        image : categorie.image,
      }
    }
    return _.sortBy(response, 'name');
  });
}

const categorie = (_id) => {
  return CategorieModel.getCategorie(_id)
  .then((data) => {
    if (data === null) {
      throw new Error('noCategorieError');
    }

    let response = {
      id: categorie._id,
      name: categorie.name,
      image : categorie.image,
    };
    return response;
  });
}

const createCategorie = (Categorie) => {
  return CategorieModel.createCategorie(Categorie);
}

const updateCategorie = (id, Categorie) => {
  return CategorieModel.updateCategorie(id, Categorie);
}

const deleteCategorie = (id) => {
  return CategorieModel.deleteCategorie(id);
}

export default {
  // Controller des views
  getCategories: (req, res) => {
    categories()
    .then((data) => {
      res.render('categorie/categories', { categories: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getCategorie: (req, res) => {
    categorie(req.params.id)
    .then((data) => {
      res.render('categorie/categorie', { categorie: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getCreateCategorie: (req, res) => {
    WordModel.getWords()
    .then((data) => {
      res.render('categorie/createCategorie', { words: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postCreateCategorie: (req, res) => {
    let categorie = {
      name: req.body.name,
      image: req.body.image,
    };

    createCategorie(categorie)
    .then((data) => {
      res.redirect('/categories');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getUpdateCategorie: (req, res) => {
    Promise.all([
      categorie(req.params.id),
      WordModel.getWords(),
    ])
    .then((data) => {
      res.render('categorie/updateCategorie', { categorie: data[0], words: data[1] });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postUpdateCategorie: (req, res) => {
    let categorie = {
      name: req.body.name,
      image: req.body.image,
    };

    updateCategorie(req.params.id, categorie)
    .then((data) => {
      res.redirect('/categories');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getDeleteCategorie: (req, res) => {
    deleteCategorie(req.params.id)
    .then((data) => {
      res.redirect('/categories');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  // Controller des Apis
  getCategoriesApi: (req, res) => {
    categories()
    .then((data) => {
      res.send(data);
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getCategorieApi: (req, res) => {
    categorie(req.params.id)
    .then((data) => {
      res.send(data);
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postCreateCategorieApi: (req, res) => {
    let categorie = {
      name: req.body.name,
      image: req.body.image,
    };

    createCategorie(categorie)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postUpdateCategorieApi: (req, res) => {
    let categorie = {
      name: req.body.name,
      image: req.body.image,
    };

    updateCategorie(req.params.id, categorie)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postDeleteCategorieApi: (req, res) => {
    deleteCategorie(req.params.id)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },
};
