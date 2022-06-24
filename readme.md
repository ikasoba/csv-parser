# csv-parser
## how to install
### node
```sh
npm i https://github.com/ikasoba/csv-parser.git
```
### deno
```js
import {parser} from "https://raw.githubusercontent.com/ikasoba/csv-parser/main/src/index.ts"
```

## how to parse csv
### parse simple csv file
```js
console.log(parser(`1,2,3,4
5,6,7,8`))
// [ [ "1", "2", "3", "4" ], [ "5", "6", "7", "8" ] ]
```

### parse more value type
```js
console.log(parser(`1234,0xff,text,"""お前はもう、死んでいる"""`,raw => {
  if (raw.match(/^\d+$/))return parseInt(raw);
  else if (raw.match(/^0x[a-fA-F0-9]+$/))return parseInt(raw,16);
  else return raw
}))
// [ [ 1234, 255, "text", '"お前はもう、死んでいる"' ] ]
```
