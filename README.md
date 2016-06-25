# erouter-parser
Express body parsing middleware.


## Installation

```bash
$ npm install erouter-parser
```

## Options

  - `limit` number or string representing the request size limit, Defaults to '100kb'
  - `encoding` The requested encoding, Defaults to 'utf8'

## Example

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