'use strict';

var logTasks = require('./tasks.js');

var tree = {
  nodes: [{
    label: 'task0',
    nodes: [{
      label: '<series>',
      branch: true,
      nodes: [{
        label: '<parallel>',
        branch: true,
        nodes: [{
          label: '<series>',
          branch: true,
          nodes: [{
            label: 'task2',
          },{
            label: '<palallel>',
            branch: true,
            nodes: [{
              label: 'task8',
            },{
              label: 'task9',
            },],
          },{
            label: 'task3',
          },],
        },{
          label: 'task4',
        },{
          label: 'task6',
        },],
      },{
        label: 'task7',
      },],
    },],
  },{
    label: 'task1',
    nodes: [],
  },],
};

tree.label = 'Tasks (Not hide branch tasks)';
logTasks(tree, false);

console.log();

tree.label = 'Tasks (Hide branch tasks)';
logTasks(tree, true);


