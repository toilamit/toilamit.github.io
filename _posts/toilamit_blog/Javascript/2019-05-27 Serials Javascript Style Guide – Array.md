Serials Javascript Style Guide – Arrays

## Arrays
<a name="arrays--literals"></a><a name="4.1"></a>
### [4.1](#arrays--literals) Literals
Khi tạo mới array nên sử dụng literal syntax. eslint: [`no-array-constructor`](https://eslint.org/docs/rules/no-array-constructor.html)

```javascript
// bad
const items = new Array();

// good
const items = [];
```

<a name="arrays--push"></a><a name="4.2"></a>
### [4.2](#arrays--push) Push
Sử dụng [Array#push](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/push) thay vì gán trực tiếp các phần tử vào array.

```javascript
const someStack = [];

// bad
someStack[someStack.length] = 'abracadabra';

// good
someStack.push('abracadabra');
```

<a name="es6-array-spreads"></a><a name="4.3"></a>
### [4.3](#es6-array-spreads) Array spreads
Sử dụng array spreads `...` để sao chép arrays.

```javascript
// bad
const len = items.length;
const itemsCopy = [];
let i;

for (i = 0; i < len; i += 1) {
  itemsCopy[i] = items[i];
}

// good
const itemsCopy = [...items];
```

<a name="arrays--from"></a>
<a name="arrays--from-iterable"></a><a name="4.4"></a>
### [4.4](#arrays--from-iterable) From iterable
Để chuyển 1 iterable object sang array, sử dụng spreads `...` thay vì [`Array.from`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from).

```javascript
const foo = document.querySelectorAll('.foo');

// good
const nodes = Array.from(foo);

// best
const nodes = [...foo];
```

<a name="arrays--from-array-like"></a>
### [4.5](#arrays--from-array-like) From array like
Sử dụng [`Array.from`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from) để chuyển đổi 1 array-like object sang 1 array.

```javascript
const arrLike = { 0: 'foo', 1: 'bar', 2: 'baz', length: 3 };

// bad
const arr = Array.prototype.slice.call(arrLike);

// good
const arr = Array.from(arrLike);
```

<a name="arrays--mapping"></a>
### [4.6](#arrays--mapping) Mapping
Sử dụng [`Array.from`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from) thay vì spread `...` để mapping thông qua iterables, vì để tránh tạo ra intermediate array.

```javascript
// bad
const baz = [...foo].map(bar);

// good
const baz = Array.from(foo, bar);
```

<a name="arrays--callback-return"></a><a name="4.5"></a>
### [4.7](#arrays--callback-return) Callback return
Hãy sử dụng lệnh return trong hàm callback của array. Nó có thể được bỏ qua nếu thân hàm trả về với 1 câu lệnh đơn. Tham khảo: [8.2](#arrows--implicit-return). eslint: [`array-callback-return`](https://eslint.org/docs/rules/array-callback-return)

```javascript
// good
[1, 2, 3].map((x) => {
  const y = x + 1;
  return x * y;
});

// good
[1, 2, 3].map(x => x + 1);

// bad - no returned value means `acc` becomes undefined after the first iteration
[[0, 1], [2, 3], [4, 5]].reduce((acc, item, index) => {
  const flatten = acc.concat(item);
});

// good
[[0, 1], [2, 3], [4, 5]].reduce((acc, item, index) => {
  const flatten = acc.concat(item);
  return flatten;
});

// bad
inbox.filter((msg) => {
  const { subject, author } = msg;
  if (subject === 'Mockingbird') {
    return author === 'Harper Lee';
  } else {
    return false;
  }
});

// good
inbox.filter((msg) => {
  const { subject, author } = msg;
  if (subject === 'Mockingbird') {
    return author === 'Harper Lee';
  }

  return false;
});
```

<a name="arrays--bracket-newline"></a>
### [4.8](#arrays--bracket-newline) Bracket newline
Sử dụng line breaks sau khi mở và đóng ngoặc array, nếu array có nhiều dòng.

```javascript
// bad
const arr = [
  [0, 1], [2, 3], [4, 5],
];

const objectInArray = [{
  id: 1,
}, {
  id: 2,
}];

const numberInArray = [
  1, 2,
];

// good
const arr = [[0, 1], [2, 3], [4, 5]];

const objectInArray = [
  {
    id: 1,
  },
  {
    id: 2,
  },
];

const numberInArray = [
  1,
  2,
];
```