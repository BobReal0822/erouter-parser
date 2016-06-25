# erouter-parser

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![David deps][david-image]][david-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/erouter-parser.svg?style=flat-square
[npm-url]: https://npmjs.org/package/erouter-parser
[travis-image]: https://img.shields.io/travis/cojs/erouter-parser.svg?style=flat-square
[travis-url]: https://travis-ci.org/cojs/erouter-parser
[coveralls-image]: https://img.shields.io/coveralls/cojs/erouter-parser.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/cojs/erouter-parser?branch=master
[david-image]: https://img.shields.io/david/cojs/erouter-parser.svg?style=flat-square
[david-url]: https://david-dm.org/cojs/erouter-parser
[download-image]: https://img.shields.io/npm/dm/erouter-parser.svg?style=flat-square
[download-url]: https://npmjs.org/package/erouter-parser


## Installation

```bash
$ npm install erouter-parser
```

## Options

  - `limit` number or string representing the request size limit, Defaults to '100kb'
  - `encoding` The requested encoding, Defaults to 'utf8'

## Example

```js
var Parser = require('erouter-parser');
var app = Express(); 
var options = {
    limit: "500kb",
    encoding: "utf8"
};

app.use(Parser(options));

```

```typescript
import Parser, { ParserOptions } from 'erouter-parser';

let app = Express();
let options: ParserOptions = {
        limit: "500kb",
        encoding: "utf8"
    };

app.use(Parser(options));

```

## License

[MIT](LICENSE)