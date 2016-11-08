const glob = require('glob')
const path = require('path')
const homedir = require('os').homedir

function list(args, flags) {
  const store = path.join(homedir(), '.project')

  glob(path.join(store, '**', '*.tar.gz'), (err, files) => {
    if (err) throw err

    console.log(files.map(file => path.basename(file)).join(', '))
  })
}

module.exports = list
