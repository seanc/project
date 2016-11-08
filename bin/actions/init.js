const pixie = require('pixie')
const decompress = require('targz').decompress
const glob = require('glob')
const fs = require('fs')
const path = require('path')
const homedir = require('os').homedir
const readline = require('readline')

// TODO: finish writing init function
function init(args, flags) {
  if (!args.length) return console.log('Usage: project init <template name> [target] [template properties...]')
  const name = args[0]
  const target = args[1] || process.cwd()
  glob(path.join(`target`, '**', '*'), (err, files) => {
    if (err) throw err
    if (files.length) {
      confirm('There are files in this folder already, do you want to continue?', [
        { option: 'y', aliases: ['yes'] },
        { option: 'n', aliases: ['no'] }
      ], answer => {
        if (answer.y) {}
      })
    }
  })
}

module.exports = init
