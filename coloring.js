'use strict';

var chalk = require('chalk');

module.exports = {

  title : function(s) {
    return chalk.magenta(s);
  },

  branch : function(s) {
    return chalk.white(s);
  },

  task: function(name) {
    switch (name) {
    case 'task0':
    case 'task1':
      return chalk.cyan(name);
    default:
      return chalk.white(name);
    }
  },
}



