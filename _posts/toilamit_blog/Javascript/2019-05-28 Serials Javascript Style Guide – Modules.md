Serials Javascript Style Guide – Modules

## Modules

<a name="modules--use-them"></a><a name="10.1"></a>
### [10.1](#modules--use-them) Use them
Luôn sử dụng module (`import`/`export`).

> Tại sao ư? Modules là tương lại vì vậy hãy bắt đầu sử dụng ngay bây giờ.

```javascript
// bad
const AirbnbStyleGuide = require('./AirbnbStyleGuide');
module.exports = AirbnbStyleGuide.es6;

// ok
import AirbnbStyleGuide from './AirbnbStyleGuide';
export default AirbnbStyleGuide.es6;

// best
import { es6 } from './AirbnbStyleGuide';
export default es6;
```

<a name="modules--no-wildcard"></a><a name="10.2"></a>
### [10.2](#modules--no-wildcard) No wildcard
Không sử dụng wildcard imports.

> Tại sao ư? Điều này đảm bảo bạn có 1 default export duy nhất.

```javascript
// bad
import * as AirbnbStyleGuide from './AirbnbStyleGuide';

// good
import AirbnbStyleGuide from './AirbnbStyleGuide';
```

<a name="modules--no-export-from-import"></a><a name="10.3"></a>
### [10.3](#modules--no-export-from-import) No export from import
Không export trực tiếp từ import.

> Tại sao ư? Một dòng là ngắn gọn đấy nhưng để cho nhất quán thì hãy tách biệt các thành phần cần import và export ra.

```javascript
// bad
// filename es6.js
export { es6 as default } from './AirbnbStyleGuide';

// good
// filename es6.js
import { es6 } from './AirbnbStyleGuide';
export default es6;
```

<a name="modules--no-duplicate-imports"></a>
### [10.4](#modules--no-duplicate-imports) No duplicate imports
eslint: [`no-duplicate-imports`](https://eslint.org/docs/rules/no-duplicate-imports)

> Tại sao ư? Sẽ rất khó maintain nếu như import nhiều lần từ cùng 1 path.

```javascript
// bad
import foo from 'foo';
// … some other imports … //
import { named1, named2 } from 'foo';

// good
import foo, { named1, named2 } from 'foo';

// good
import foo, {
  named1,
  named2,
} from 'foo';
```

<a name="modules--no-mutable-exports"></a>
### [10.5](#modules--no-mutable-exports) No mutable exports
Không export các giá trị có thể thay đổi được. eslint: [`import/no-mutable-exports`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-mutable-exports.md)

> Tại sao ư? Nói chung là nên tránh sự thay đổi để dễ maintain và tránh bug. Tốt nhất chỉ nên export các tham chiếu hằng.

```javascript
// bad
let foo = 3;
export { foo };

// good
const foo = 3;
export { foo };
```

<a name="modules--prefer-default-export"></a>
### [10.6](#modules--prefer-default-export) Prefer default export
Nếu mà một module chỉ có 1 export thì khuyến khích sử dụng default export. eslint: [`import/prefer-default-export`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/prefer-default-export.md)

> Tại sao ư? Nó dễ đọc và dễ maintain.

```javascript
// bad
export function foo() {}

// good
export default function foo() {}
```

<a name="modules--imports-first"></a>
### [10.7](#modules--imports-first) Import first
eslint: [`import/first`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/first.md)

> Tại sao ư? Vì `import` ưu tiên sử dụng nên hãy để ở trên đầu tránh các bug không mong muốn.

```javascript
// bad
import foo from 'foo';
foo.init();

import bar from 'bar';

// good
import foo from 'foo';
import bar from 'bar';

foo.init();
```

<a name="modules--multiline-imports-over-newlines"></a>
### [10.8](#modules--multiline-imports-over-newlines) Multiline imports over newlines

```javascript
// bad
import {longNameA, longNameB, longNameC, longNameD, longNameE} from 'path';

// good
import {
  longNameA,
  longNameB,
  longNameC,
  longNameD,
  longNameE,
} from 'path';
```

<a name="modules--no-webpack-loader-syntax"></a>
### [10.9](#modules--no-webpack-loader-syntax) No webpack loader syntax
Không load Webpack khi import. eslint: [`import/no-webpack-loader-syntax`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-webpack-loader-syntax.md)

> Tại sao ư? Vì nếu sử dụng cú pháp Webpack trong khi import sẽ ghép mã tới 1 đóng gói module. Khuyến khích sử dụng cú pháp tải trong file `webpack.config.js`.

```javascript
// bad
import fooSass from 'css!sass!foo.scss';
import barCss from 'style!css!bar.css';

// good
import fooSass from 'foo.scss';
import barCss from 'bar.css';
```

Tổng hợp [Serial Javascript Style Guide](/2019/05/17/serials-javascript-style-guide/)