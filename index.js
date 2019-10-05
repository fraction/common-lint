#!/usr/bin/env node

const findPackageJson = require('find-package-json')
const childProcess = require('child_process')
const path = require('path')
const debug = require('debug')('common-lint')

const args = process.argv.slice(2)

const startLocation = args.reduce((acc, cur) => {
  const startsWithDash = cur.startsWith('-')
  if (startsWithDash === false) {
    acc = cur
  }

  return acc
}, process.cwd())

// It's important that we start looking in the process CWD.
// We don't use `__dirname` here because it's the path to this file.
const finder = findPackageJson(startLocation)

// Find the closest `package.json` and extract dependencies.
const packageFile = finder.next()
const hasPackageFile = packageFile.value != null

const command = 'eslint'

let config = null
if (hasPackageFile) {
  debug('has package file')
  const packageFilePath = packageFile.filename
  const modulePath = path.dirname(packageFilePath)
  debug({ modulePath })
  const { dependencies, devDependencies } = packageFile.value

  const allDependencies = [dependencies, devDependencies]
  const hasStandard = allDependencies.some((deps = {}) =>
    Object.keys(deps).includes('standard')
  )

  if (hasStandard) {
    config = path.join(modulePath, 'node_modules', 'standard', 'eslintrc.json')
  }
}

const notFoundError = `
Could not locate "${command}", is it installed?

- npm -g install ${command}
- yarn global add ${command}

Please ensure that "${command} --help" works and then try again.
`

const prefix = config === null ? '' : ['--config', config]

try {
  const commandArgs = [...prefix, ...args]
  debug({ prefix, args, commandArgs })
  childProcess.execFileSync(command, commandArgs, {
    stdio: 'inherit'
  })
} catch (err) {
  // We can safely ignore most errors, but we *do* want to catch "not found"
  // errors and output them to the user.
  if (err.code === 'ENOENT') {
    console.error(notFoundError)
    process.exit(127)
  }
}
