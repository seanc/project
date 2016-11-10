const fs = require('fs')
const os = require('os')
const path = require('path')
const dedent = require('dedent')

const help = require('./help')

function setup() {
  const home = os.homedir()
  const store = path.join(home, '.project')

  fs.exists(store, file => {
    if (file) return

    console.log(dedent`
      Thanks for installing project.
      You will only see this message once.
      I am currently creating the necessary directories and files
      for me to store templates.
    `);

    fs.mkdir(store, err => {
      if (err) throw err;

      console.log(`Created ${store}`)
      process.exit(0)
    })
  })
}

module.exports = setup;
