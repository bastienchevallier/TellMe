'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Liste des erreurs que l'API peut renvoyer

var list = {
  noCategoriesError: {
    code: 500,
    error: 'noCategoriesError',
    error_description: 'La base ne contient pas de categorie'
  },
  noCategorieError: {
    code: 500,
    error: 'noCategorieError',
    error_description: 'Cette categorie n\'existe pas'
  },
  noGrammarsError: {
    code: 500,
    error: 'noGrammarsError',
    error_description: 'La base ne contient pas de categorie grammaticale'
  },
  noGrammarError: {
    code: 500,
    error: 'noGrammarError',
    error_description: 'Cette categorie grammaticale n\'existe pas'
  }
};

exports.default = function (err) {
  if (err instanceof Error && err.message) {
    return list[err.message] ? list[err.message] : { code: 500, error: 'UnknownError', error_description: 'Unknown error' };
  } else {
    return list[err] ? list[err] : { code: 500, error: 'UnknownError', error_description: 'Unknown error' };
  }
};