'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Liste des erreurs que l'API peut renvoyer

var list = {
  noShowsError: {
    code: 500,
    error: 'noWordsError',
    error_description: 'La base ne contient pas de mot'
  },
  noShowError: {
    code: 500,
    error: 'noWordError',
    error_description: 'Ce mot n\'existe pas'
  },
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