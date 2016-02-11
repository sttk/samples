'use strict';

module.exports = function(name) {

  return {
    description: 'Description of ' + name + '.',
    flags: {
      '--flag-1': 'Flag 1 of ' + name + '.',
      '--flag-2': 'Flag 2 of ' + name + '.',
    },
  };
};
