const glob = require('glob')
const path = require('path')
const homedir = require('os').homedir

function list(args, flags) {
  const store = path.join(homedir(), '.project')

  glob(path.join(store, '**', '*.tar.gz'), (err, files) => {
    if (err) throw err
    const templates = files.map(file => path.basename(file, '.tar.gz')).join(', ')
    console.log(templates ? templates : 'no templates created')
  })
}

module.exports = list
