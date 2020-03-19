Serials Javascript Style Guide – Objects

## Objects

<a name="objects--no-new"></a><a name="3.1"></a>
### [3.1](#objects--no-new) No new
Sử dụng cú pháp nguyên thủy khi tạo mới 1 object. eslint: [`no-new-object`](https://eslint.org/docs/rules/no-new-object.html)

```javascript
// bad
const item = new Object();

// good
const item = {};
```

<a name="es6-computed-properties"></a><a name="3.4"></a>
### [3.2](#es6-computed-properties) Computed properties
Sử dụng computed property names khi tạo mới object với tên thuộc tính động.

> Tại sao ư? Tập trung định nghĩa các thuộc tính của object vào 1 chỗ.

```javascript

function getKey(k) {
  return `a key named ${k}`;
}

// bad
const obj = {
  id: 5,
  name: 'San Francisco',
};
obj[getKey('enabled')] = true;

// good
const obj = {
  id: 5,
  name: 'San Francisco',
  [getKey('enabled')]: true,
};
```

<a name="es6-object-shorthand"></a><a name="3.5"></a>
### [3.3](#es6-object-shorthand) Object shorthand
Hãy sử dụng shorhand cho các medthod của Object. eslint: [`object-shorthand`](https://eslint.org/docs/rules/object-shorthand.html)

```javascript
// bad
const atom = {
  value: 1,

  addValue: function (value) {
    return atom.value + value;
  },
};

// good
const atom = {
  value: 1,

  addValue(value) {
    return atom.value + value;
  },
};
```

<a name="es6-object-concise"></a><a name="3.6"></a>
### [3.4](#es6-object-concise) Object concise
Sử dụng shorhand cho thuộc tính. eslint: [`object-shorthand`](https://eslint.org/docs/rules/object-shorthand.html)

> Tại sao ư? Nó ngắn hơn và gợi tả hơn.

```javascript
const lukeSkywalker = 'Luke Skywalker';

// bad
const obj = {
  lukeSkywalker: lukeSkywalker,
};

// good
const obj = {
  lukeSkywalker,
};
```

<a name="objects--grouped-shorthand"></a><a name="3.7"></a>
### [3.5](#objects--grouped-shorthand) Grouped shorthand
Nhóm các thuộc tính shorthand khi bắt đầu khai báo object.

> Tại sao ư? Đơn giản vì dễ dàng thấy được các thuộc tính nào sử dụng shorthand thôi.

```javascript
const anakinSkywalker = 'Anakin Skywalker';
const lukeSkywalker = 'Luke Skywalker';

// bad
const obj = {
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  lukeSkywalker,
  episodeThree: 3,
  mayTheFourth: 4,
  anakinSkywalker,
};

// good
const obj = {
  lukeSkywalker,
  anakinSkywalker,
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  episodeThree: 3,
  mayTheFourth: 4,
};
```

<a name="objects--quoted-props"></a><a name="3.8"></a>
### [3.6](#objects--quoted-props) Quoted props
Chỉ nên quote những thuộc tính không valid. eslint: [`quote-props`](https://eslint.org/docs/rules/quote-props.html)

> Tại sao ư? Vì tính dễ đọc, syntax highlight và dễ dàng được tối ưu bởi nhiều engines JS khác.

```javascript
// bad
const bad = {
  'foo': 3,
  'bar': 4,
  'data-blah': 5,
};

// good
const good = {
  foo: 3,
  bar: 4,
  'data-blah': 5,
};
```

<a name="objects--prototype-builtins"></a>
### [3.7](#objects--prototype-builtins) Prototype builtins
Không gọi trực tiếp phương thức `Object.prototype` như `hasOwnProperty`, `propertyIsEnumerable`, và `isPrototypeOf`. eslint: [`no-prototype-builtins`](https://eslint.org/docs/rules/no-prototype-builtins)

> Tại sao ư? Những phương thức này có thể bị che khuất bởi các thuộc tính trên object trong question - consider `{ hasOwnProperty: false }` - hoặc, object có thể là null object (`Object.create(null)`).

```javascript
// bad
console.log(object.hasOwnProperty(key));

// good
console.log(Object.prototype.hasOwnProperty.call(object, key));

// best
const has = Object.prototype.hasOwnProperty; // cache the lookup once, in module scope.
/* or */
import has from 'has'; // https://www.npmjs.com/package/has
// ...
console.log(has.call(object, key));
```

<a name="objects--rest-spread"></a>
### [3.8](#objects--rest-spread) Rest spread
Nên sử dụng toán tử spread hơn là [`Object.assign`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) để copy object. Sử dụng toán tử rest để lấy object mới với các thuộc tính được bỏ qua.

```javascript
// very bad
const original = { a: 1, b: 2 };
const copy = Object.assign(original, { c: 3 }); // this mutates `original` ಠ_ಠ
delete copy.a; // so does this

// bad
const original = { a: 1, b: 2 };
const copy = Object.assign({}, original, { c: 3 }); // copy => { a: 1, b: 2, c: 3 }

// good
const original = { a: 1, b: 2 };
const copy = { ...original, c: 3 }; // copy => { a: 1, b: 2, c: 3 }

const { a, ...noA } = copy; // noA => { b: 2, c: 3 }
```