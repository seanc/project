const dedent = require('dedent')

function help() {
  console.log(`
  Usage:
    project save <name> [target]
    project init <template name> [target] [template properties...]
    project list
  `)
}

module.exports = help
