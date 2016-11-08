const compress = require('targz').compress
const path = require('path').join
const homedir = require('os').homedir
const fs = require('fs')

function save(args, flags) {
  if (args.length < 1) return console.log('Usage: project save <name> [target]')

  const name = args[0]
  const target = args[1] || process.cwd()
  const store = join(homedir(), '.project')
  const tar = path.join(store, `${name}.tar.gz`)

  fs.exists(tar, file => {
    if (file) return console.log(`project ${name} already exists`)

    compress({ src: target, dest: join(store, tar) }, err => {
      if (err) throw err
      console.log(`Created new template ${name} from ${target}`)
    })
  })
}

module.exports = save
