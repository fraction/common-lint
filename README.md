# common-lint

> compatibility for both standard and eslint



## Usage

Use `common-lint` or `clint` from the command-line or your linter settings.

### ESLint

By default, this module passes through to `eslint`.

```console
$ common-lint --help
eslint [options] file.js [file.js] [dir]

Basic configuration:
  --no-eslintrc                   Disable use of configuration from .eslintrc.*
[...]
```

### StandardJS

If `standard` is found in your `package.json`, this module uses that instead.

```console
$ common-lint --help
standard - Use JavaScript Standard Style (https://standardjs.com)

Usage:
    standard <flags> [FILES...]
[...]
```

## Installation

With [npm](https://npmjs.org/):

```shell
npm -g install common-readme
```

With [yarn](https://yarnpkg.com/en/):

```shell
yarn global add common-readme
```

## License

AGPL-3.0

