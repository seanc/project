const compress = require('targz').compress
const path = require('path')
const homedir = require('os').homedir
const fs = require('fs')

function save(args, flags) {
  if (args.length < 1) return console.log('Usage: project save <name> [target]')

  const name = args[0]
  const target = args[1] || process.cwd()
  const store = path.join(homedir(), '.project')
  const tar = path.join(store, `${name}.tar.gz`)

  fs.exists(tar, file => {
    if (file) {
      console.log(`template ${name} already exists`)
      process.exit(0)
    }

    compress({ src: target, dest: tar }, err => {
      if (err) throw err
      console.log(`created new template ${name} from ${target}`)
    })
  })
}

module.exports = save
