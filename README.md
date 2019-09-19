# common-lint

> compatibility for both standard and eslint

## Usage

Use `common-lint` or `clint` from the command-line or your linter settings.

### ESLint

By default, this module passes through to `eslint`.

```console
$ common-lint

/home/alice/foo/index.js
  31:41  error  'val' is defined but never used  no-unused-vars

✖ 1 problem (1 error, 0 warnings)
```

### StandardJS

If `standard` is found in your `package.json`, this module uses that instead.

```console
$ common-lint
standard: Use JavaScript Standard Style (https://standardjs.com)
standard: Run `standard --fix` to automatically fix some problems.
  /home/alice/bar/index.js:59:27: Extra semicolon.
```

## Installation

With [npm](https://npmjs.org/):

```shell
npm -g install common-lint
```

With [yarn](https://yarnpkg.com/en/):

```shell
yarn global add common-lint
```

## License

AGPL-3.0

