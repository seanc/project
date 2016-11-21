const pixie = require('pixie')
const decompress = require('targz').decompress
const glob = require('glob')
const fs = require('fs')
const path = require('path')
const os = require('os')
const through = require('through2')
const confirm = require('confirm')
const request = require('request')
const random = require('randomstring').generate
const mv = require('mv')
const each = require('each-async')
const trash = require('trash')

function init(args, flags) {
  if (!args.length) return console.log('Usage: project init <template name> [target] [template properties...]')
  const name = args[0]
  const target = args[1] || process.cwd()
  let template = path.join(os.homedir(), '.project', `${name}.tar.gz`)

  glob(path.join(target, '**', '*'), (err, files) => {
    if (err) throw err

    if (name.includes('/')) {
      const signature = name.split('/')
      const author = signature[0]
      const project = signature[1]
      const url = `https://api.github.com/repos/${author}/${project}/tarball`

      const file = path.join(os.tmpdir(), `project-${random(15)}.tar.gz`)

      const req = request({
        url,
        headers: {
          'User-Agent': 'project'
        }
      }, (err, res, body) => {
        if (err) {
          console.log(err)
          process.exit(0)
        }

        const filename = res.headers['content-disposition'].split('filename=')[1].trim()

        fs.exists(target, file => {
          if (file) {
            console.log(`Directory ${target} already exists and cannot be overwritten when pulling from a repository`)
            return trash([template]).then(() => process.exit(0)).catch(err => console.log(err))
          }
        })

        write(file, target, flags, path.basename(filename, '.tar.gz'))
      }).pipe(fs.createWriteStream(file))
      return
    }

    if (files.length) {
      return confirm('There are files in this folder already, do you want to continue?', [
        { option: 'y', aliases: ['yes'] },
        { option: 'n', aliases: ['no'] }
      ], answer => {
        if (answer.y) {
          write(template, target, flags)
        } else {
          console.log('Aborted')
          process.exit(0)
        }
      })
    }

    write(template, target, flags)
  })
}

function write(template, target, flags, source) {
  source = source || ''
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

    glob(path.join(target, '**', '*'), (err, files) => {
      if (err) throw err;
      if (files.map(f => path.basename(f)).includes(source)) {
        const name = path.basename(source, '.tar.gz')
          .split('-').slice(0, -1).join('-').replace('-', '/')

        files = files.filter(f => !fs.lstatSync(f).isDirectory())

        each(files, (file, index, done) => {
          const parts = file.split(path.sep)
          parts.splice(1, 1)
          mv(file, parts.join(path.sep), { mkdirp: true }, err => {
            if (err) console.log(err)
            done()
          })
        }, () => {
          trash([path.join(target, source), template])
          .then(() => done(target, name))
          .catch(err => console.log(err))
        })
        return
      }

      done(target, path.basename(template, '.tar.gz'))
    })
  })
}

function done(target, name) {
  console.log(`created project ${path.basename(target)} from ${name}`)
  process.exit(0)
}

module.exports = init
