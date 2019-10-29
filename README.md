# project [![Build Status](https://travis-ci.org/seanc/project.svg?branch=master)](https://travis-ci.org/seanc/project)

> Simple project template manager

## What is project?
Project is a CLI tool for development for the purpose of reusing directory structures and files for applications. Project can preserve directory structure and files in a _template_. A template is a compressed version of directories and files. Files can include _template options_ which are filled in when a template is used.

Project projects your inputs onto a template to create a new application.

## Installation

```sh
$ npm install -g seanc/project
```

## Usage

```sh
$ project save <template name> [target directory] # Create a template from a directory. Recursively copies structure.
$ project init <template name> [target] [template options... | ex. --url https://example.com] # Use a template. Initializes a copy of template completed with inputted template options
$ project remove <template name> # Remove a template
$ project list # List templates
```

## Notes
Templates are located in `$HOME/.project`. There are compressed in tarball format.

## License

MIT © [Sean Wilson](https://imsean.me)
