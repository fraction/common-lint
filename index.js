#!/usr/bin/env node

const findPackageJson = require('find-package-json')

// It's important that we start looking in the process CWD.
// We don't use `__dirname` here because it's the path to this file.
const startLocation = process.cwd()
const finder = findPackageJson(startLocation)

// Find the closest `package.json` and extract dependencies.
const packageFile = finder.next()
const { dependencies, devDependencies } = packageFile.value

const allDependencies = [dependencies, devDependencies]
const hasStandard = allDependencies.some((deps = {}) =>
  Object.keys(deps).includes('standard')
)

if (hasStandard) {
  require('standard/bin/cmd')
} else {
  require('eslint/bin/eslint')
}
