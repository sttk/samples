'use strict';

var coloring = require('./coloring');

function isString(val) {
  return typeof val === 'string';
}

function isObject(val) {
  return typeof val === 'object' && !Array.isArray(val);
}

function forEachNode(nodes, fn) {
  if (!Array.isArray(nodes)) {
    return;
  }

  var args = [].slice.call(arguments, 2);

  for (var i = 0, n = nodes.length; i < n; i++) {
    fn.apply(nodes[i], [nodes[i], i, n].concat(args));
  }
}

function isFirst(arr, elem) {
  return (arr[0] === elem);
}

function isLast(arr, elem) {
  return (arr[arr.length - 1] === elem);
}

function createBranch(ancestors, indents, depth, def) {
  var branch = '';

  if (ancestors[depth].branch) {
    if (ancestors[depth].nodes.length > 1) {
      branch = '┬─';
    } else {
      branch = '──';
    }

    for (var i = depth - 1; i >= 1; i--) {
      if (!ancestors[i].branch) {
        if (isLast(ancestors[i].nodes, ancestors[i + 1])) {
          branch = '└─' + branch;
        } else {
          branch = '├─' + branch;
        }

        break;
      }

      if (ancestors[i].nodes.length > 1) {
        if (isFirst(ancestors[i].nodes, ancestors[i + 1])) {
          branch = '┬─' + branch;

        } else if (isLast(ancestors[i].nodes, ancestors[i + 1])) {
          branch = '└─' + branch;
          break;

        } else {
          branch = '├─' + branch;
          break;
        }
      } else {
        branch = '──' + branch;
      }
    }

    branch = indents[i] + branch;

  } else {
    branch = indents[depth] + def;
  }

  return branch;
}

function logTasks(tree, hideBranchTasks) {
  var lines = [];

  if (hideBranchTasks) {
    forEachNode(tree.nodes, fn1, 0, [''], [tree]);
  } else {
    forEachNode(tree.nodes, fn0, 0, ['']);
  }

  function fn1(node, index, count, depth, indents, ancestors) {

    var branch = '';
    if (count === 1) {
      indents[depth + 1] = indents[depth] + '  ';
      branch = createBranch(ancestors, indents, depth, '└─');

    } else if (index === 0) {
      indents[depth + 1] = indents[depth] + '│ ';
      branch = createBranch(ancestors, indents, depth, '├─');

    } else if (index === count - 1) {
      indents[depth + 1] = indents[depth] + '  ';
      branch = indents[depth] + '└─';

    } else {
      indents[depth + 1] = indents[depth] + '│ ';
      branch = indents[depth] + '├─';
    }

    if (!Array.isArray(node.nodes) || node.nodes.length === 0) {
      branch += '─ ';
    } else {
      branch += '┬ ';
    }

    if (!node.branch) {
      lines.push(coloring.branch(branch) + coloring.task(node.label));
    }

    ancestors[depth + 1] = node;
    forEachNode(node.nodes, fn1, depth + 1, indents, ancestors);
  }

  function fn0(node, index, count, depth, indents) {
    var branch;
    if (index === count - 1) {
      indents[depth + 1] = indents[depth] + '  ';
      branch = indents[depth] + '└─';

    } else {
      indents[depth + 1] = indents[depth] + '│ ';
      branch = indents[depth] + '├─';
    }

    if (!Array.isArray(node.nodes) || node.nodes.length === 0) {
      branch += '─ ';
    } else {
      branch += '┬ ';
    }

    lines.push(coloring.branch(branch) + coloring.task(node.label));

    forEachNode(node.nodes, fn0, depth + 1, indents);
  };

  console.log(coloring.title(tree.label));

  lines.forEach(function(line) {
    console.log(line);
  });
}

module.exports = logTasks;
