Serials Javascript Style Guide – Naming Conventions

## Naming Conventions

<a name="naming--descriptive"></a><a name="22.1"></a>
### [Descriptive](#naming--descriptive) 
Tránh sử dụng tên 1 ký tư, thay vào đó hãy mô tả bằng tên có ý nghĩa. eslint: [`id-length`](https://eslint.org/docs/rules/id-length)

```javascript
// bad
function q() {
  // ...
}

// good
function query() {
  // ...
}
```

<a name="naming--camelCase"></a><a name="22.2"></a>
### [camelCase](#naming--camelCase) 
Sử dụng camelCase khi đặt tên objects, functions, và instances. eslint: [`camelcase`](https://eslint.org/docs/rules/camelcase.html)

```javascript
// bad
const OBJEcttsssss = {};
const this_is_my_object = {};
function c() {}

// good
const thisIsMyObject = {};
function thisIsMyFunction() {}
```

<a name="naming--PascalCase"></a><a name="22.3"></a>
### [PascalCase](#naming--PascalCase) 
Chỉ sử dụng PascalCase khi đặt tên constructors hoặc classes. eslint: [`new-cap`](https://eslint.org/docs/rules/new-cap.html)

```javascript
// bad
function user(options) {
  this.name = options.name;
}

const bad = new user({
  name: 'nope',
});

// good
class User {
  constructor(options) {
    this.name = options.name;
  }
}

const good = new User({
  name: 'yup',
});
```

<a name="naming--leading-underscore"></a><a name="22.4"></a>
### [Leading underscore](#naming--leading-underscore) 
Không đặt tên với bắt đầu hoặc kết thúc có dấu gạch dưới. eslint: [`no-underscore-dangle`](https://eslint.org/docs/rules/no-underscore-dangle.html)

> Tại sao ư? Vì JavaScript không có khái niệm về các điều khoản riêng tư với properties hoặc methods. Mặc dù dấu gạch dưới ở đầu thường quy ước là "private", trên thực tế, thì toàn bộ lại là public. Việc này có thể khiến các developers khác hiểu sai rằng sẽ không thể thay đổi hoặc việc test là không cần thiết.

```javascript
// bad
this.__firstName__ = 'Panda';
this.firstName_ = 'Panda';
this._firstName = 'Panda';

// good
this.firstName = 'Panda';

// good, in environments where WeakMaps are available
// see https://kangax.github.io/compat-table/es6/#test-WeakMap
const firstNames = new WeakMap();
firstNames.set(this, 'Panda');
```

<a name="naming--self-this"></a><a name="22.5"></a>
### [Self this](#naming--self-this) 
Không gán biến bởi `this`. Hãy sử dụng hàm mũi tên hoặc [Function#bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).

```javascript
// bad
function foo() {
  const self = this;
  return function () {
    console.log(self);
  };
}

// bad
function foo() {
  const that = this;
  return function () {
    console.log(that);
  };
}

// good
function foo() {
  return () => {
    console.log(this);
  };
}
```

<a name="naming--filename-matches-export"></a><a name="22.6"></a>
### [Filename matches export](#naming--filename-matches-export) 
Bạn nên đặt tên file trùng với tên mà nó sẽ export default.

```javascript
// file 1 contents
class CheckBox {
  // ...
}
export default CheckBox;

// file 2 contents
export default function fortyTwo() { return 42; }

// file 3 contents
export default function insideDirectory() {}

// in some other file
// bad
import CheckBox from './checkBox'; // PascalCase import/export, camelCase filename
import FortyTwo from './FortyTwo'; // PascalCase import/filename, camelCase export
import InsideDirectory from './InsideDirectory'; // PascalCase import/filename, camelCase export

// bad
import CheckBox from './check_box'; // PascalCase import/export, snake_case filename
import forty_two from './forty_two'; // snake_case import/filename, camelCase export
import inside_directory from './inside_directory'; // snake_case import, camelCase export
import index from './inside_directory/index'; // requiring the index file explicitly
import insideDirectory from './insideDirectory/index'; // requiring the index file explicitly

// good
import CheckBox from './CheckBox'; // PascalCase export/import/filename
import fortyTwo from './fortyTwo'; // camelCase export/import/filename
import insideDirectory from './insideDirectory'; // camelCase export/import/directory name/implicit "index"
// ^ supports both insideDirectory.js and insideDirectory/index.js
```

<a name="naming--camelCase-default-export"></a><a name="22.7"></a>
### [camelCase default export](#naming--camelCase-default-export) 
Sử dụng camelCase khi bạn export-default function. Tên file nên đồng nhất với tên function.

```javascript
function makeStyleGuide() {
  // ...
}

export default makeStyleGuide;
```

<a name="naming--PascalCase-singleton"></a><a name="22.8"></a>
### [PascalCase singleton](#naming--PascalCase-singleton) 
Sử dụng PascalCase khi bạn muốn export constructor / class / singleton / function library / bare object.

```javascript
const AirbnbStyleGuide = {
  es6: {
  },
};

export default AirbnbStyleGuide;
```

<a name="naming--Acronyms-and-Initialisms"></a>
### [Acronyms and Initialisms](#naming--Acronyms-and-Initialisms) 
Viết hoa tất cả hoặc viết thường tất cả các từ viết tắt và initialisms.

> Tại sao ư? Đơn giản cho nó dễ đọc thôi.

```javascript
// bad
import SmsContainer from './containers/SmsContainer';

// bad
const HttpRequests = [
  // ...
];

// good
import SMSContainer from './containers/SMSContainer';

// good
const HTTPRequests = [
  // ...
];

// also good
const httpRequests = [
  // ...
];

// best
import TextMessageContainer from './containers/TextMessageContainer';

// best
const requests = [
  // ...
];
```

<a name="naming--uppercase"></a>
### [Uppercase](#naming--uppercase) 
Có thể viết hoa 1 hằng số với các lý do sau:

1. Được export
2. Là `const`
3. Đáng tin cậy và không bao giờ sửa đổi.

> Tại sao ư? Việc này giúp cho lập trình viên hiểu được rằng UPPERCASE_VARIABLES là đáng tin cậy và không sửa đổi.
- Đối với `const` thì chỉ nên sử dụng trong trường hợp export thôi. Còn đặt tên với `const` thì không cần thiết phải viết hoa.
- Khi export object thì phần đầu sẽ là viết hoa (ví dụ: `EXPORTED_OBJECT.key`) để hiểu rằng các thuộc tính lồng nhau sẽ không sửa đổi.

```javascript
// bad
const PRIVATE_VARIABLE = 'should not be unnecessarily uppercased within a file';

// bad
export const THING_TO_BE_CHANGED = 'should obviously not be uppercased';

// bad
export let REASSIGNABLE_VARIABLE = 'do not use let with uppercase variables';

// ---

// allowed but does not supply semantic value
export const apiKey = 'SOMEKEY';

// better in most cases
export const API_KEY = 'SOMEKEY';

// ---

// bad - unnecessarily uppercases key while adding no semantic value
export const MAPPING = {
  KEY: 'value'
};

// good
export const MAPPING = {
  key: 'value'
};
```

Tổng hợp [Serial Javascript Style Guide](/2019/05/17/serials-javascript-style-guide/)