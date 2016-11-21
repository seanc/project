const dedent = require('dedent')

function help() {
  console.log(`
  Usage:
    project save <name> [target]
    project init [<template name> | <user>/<repo>] [target] [template properties...]
    project remove <template name>
    project list
  `)
  process.exit(0)
}

module.exports = help
