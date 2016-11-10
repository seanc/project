const pixie = require('pixie')
const decompress = require('targz').decompress
const glob = require('glob')
const fs = require('fs')
const path = require('path')
const homedir = require('os').homedir
const readline = require('readline')
const through = require('through2')
const confirm = require('confirm')

function init(args, flags) {
  if (!args.length) return console.log('Usage: project init <template name> [target] [template properties...]')
  const name = args[0]
  const target = args[1] || process.cwd()
  glob(path.join(target, '**', '*'), (err, files) => {
    if (err) throw err
    if (files.length) {
      return confirm('There are files in this folder already, do you want to continue?', [
        { option: 'y', aliases: ['yes'] },
        { option: 'n', aliases: ['no'] }
      ], answer => {
        if (answer.y) write(name, target, flags)
        else console.log('Aborted'); process.exit(0)
      })
    }

    write(name, target, flags)
  })
}

function write(name, target, flags) {
  const template = path.join(homedir(), '.project', `${name}.tar.gz`)
  decompress({
    src: template,
    dest: target,
    tar: {
      mapStream: f => {
        if (!flags) return f;
        return f.pipe(through.obj(function(data, _, cb) {
          this.push(new Buffer(pixie.render(data.toString(), flags), 'utf8'))
          cb()
        }))
      }
    }
  }, err => {
    if (err) return console.log(err)
    console.log(`created project ${path.basename(target)} from ${name}`)
    process.exit(0)
  })
}

module.exports = init
