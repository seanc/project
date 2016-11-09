const fs = require('fs')
const path = require('path')
const homedir = require('os').homedir
const trash = require('trash')

function remove(args, flags) {
  if (!args.length) return console.log('Usage: project remove <template name>')
  const store = path.join(homedir(), '.project')
  const name = args[0]
  const tar = path.join(store, `${name}.tar.gz`)
  fs.exists(tar, file => {
    if (!file) {
      console.log(`template ${name} does not exist`)
      process.exit(0)
    }

    trash([tar])
    .then(() => console.log(`template ${name} removed`))
    .catch(err => console.log(err))
  })
}

module.exports = remove
