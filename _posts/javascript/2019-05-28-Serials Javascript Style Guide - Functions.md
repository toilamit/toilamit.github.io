---
layout: post
title: Serials Javascript Style Guide – Functions
categories: [Javascript]
date: 2019-05-27 09:00:00 +0700
description: 
img: # Add image post ex: viet-dep-zai.jpg (optional)
fig-caption: # Add figcaption (optional)
tags: [js, js style, js function]
---

## Functions

<a name="functions--declarations"></a><a name="7.1"></a>
### [7.1](#functions--declarations) Declarations
Sử dụng các biểu thức hàm được đặt tên thay vì khai báo hàm. eslint: [`func-style`](https://eslint.org/docs/rules/func-style)

> Tại sao ư? Sự khai báo hàm được gia tăng lên, nghĩa là nó dễ, quá dễ để tham chiếu hàm trước khi được định nghĩa trong file. Điều này làm giảm khả năng đọc và khả năng bảo trì. Nếu bạn thấy 1 hàm lớn và phức tạp thì nên tách hẳn ra làm 1 module. Và đừng quên đặt tên rõ ràng và dễ hiểu cho module đó. Điều này sẽ giúp loại bỏ các giả định tạo ra về Error’s call stack. ([Discussion](https://github.com/airbnb/javascript/issues/794))

```javascript
// bad
function foo() {
  // ...
}

// bad
const foo = function () {
  // ...
};

// good
// lexical name distinguished from the variable-referenced invocation(s)
const short = function longUniqueMoreDescriptiveLexicalFoo() {
  // ...
};
```

<a name="functions--iife"></a><a name="7.2"></a>
### [7.2](#functions--iife) Iife
Hãy bọc biểu thức hàm gọi tức thì vào trong dấu ngoặc đơn `()`. eslint: [`wrap-iife`](https://eslint.org/docs/rules/wrap-iife.html)

> Tại sao ư? Một biểu thức hàm gọi tức thì là 1 đơn vị duy nhất  - bọc bản thân hàm và lời gọi hàm vào bên trong dấu ngoặc đơn để thể hiện rõ điều này. Tuy nhiên trong 1 thế giới với đầy rẫy modules thì bạn hầu như không cần IIFE.

```javascript
// immediately-invoked function expression (IIFE)
(function () {
  console.log('Welcome to the Internet. Please follow me.');
}());
```

<a name="functions--in-blocks"></a><a name="7.3"></a>
### [7.3](#functions--in-blocks) In blocks
Không bao giờ khai báo hàm trong 1 non-function block như (`if`, `while`, ...). Nên khai báo biến trước và sau đó gán biến đó vào 1 function. eslint: [`no-loop-func`](https://eslint.org/docs/rules/no-loop-func.html)

<a name="functions--note-on-blocks"></a><a name="7.4"></a>
### [7.4](#functions--note-on-blocks) Note on blocks
**Note:** ECMA-262 định nghĩa `block` như là danh sách các lệnh. Khai báo hàm không phải là lệnh.

```javascript
// bad
if (currentUser) {
  function test() {
    console.log('Nope.');
  }
}

// good
let test;
if (currentUser) {
  test = () => {
    console.log('Yup.');
  };
}
```

<a name="functions--arguments-shadow"></a><a name="7.5"></a>
### [7.5](#functions--arguments-shadow) Arguments shadow
Đừng bao giờ đặt tên tham số của hàm là `arguments`. Vì điều này sẽ ghi đè lên đối tượng `arguments` của hàm.

```javascript
// bad
function foo(name, options, arguments) {
  // ...
}

// good
function foo(name, options, args) {
  // ...
}
```

<a name="es6-rest"></a><a name="7.6"></a>
### [7.6](#es6-rest) Rest
Đừng sử dụng `arguments`, mà nên dùng cú pháp `...`. eslint: [`prefer-rest-params`](https://eslint.org/docs/rules/prefer-rest-params)

> Tại sao ư? `...` là rõ ràng hơn với những tham số mà bạn muốn. Thêm nữa các tham số còn lại là 1 array chứ không phải là array-like như `arguments`.

```javascript
// bad
function concatenateAll() {
  const args = Array.prototype.slice.call(arguments);
  return args.join('');
}

// good
function concatenateAll(...args) {
  return args.join('');
}
```

<a name="es6-default-parameters"></a><a name="7.7"></a>
### [7.7](#es6-default-parameters) Default parameters
Khuyến khích sử dụng cú pháp với tham số mặc định hơn là các tham số không đổi.

```javascript
// really bad
function handleThings(opts) {
  // No! We shouldn’t mutate function arguments.
  // Double bad: if opts is falsy it'll be set to an object which may
  // be what you want but it can introduce subtle bugs.
  opts = opts || {};
  // ...
}

// still bad
function handleThings(opts) {
  if (opts === void 0) {
    opts = {};
  }
  // ...
}

// good
function handleThings(opts = {}) {
  // ...
}
```

<a name="functions--default-side-effects"></a><a name="7.8"></a>
### [7.8](#functions--default-side-effects) Default side effects
Tránh side effects với các tham số mặc định.

```javascript
var b = 1;
// bad
function count(a = b++) {
  console.log(a);
}
count();  // 1
count();  // 2
count(3); // 3
count();  // 3
```

<a name="functions--defaults-last"></a><a name="7.9"></a>
### [7.9](#functions--defaults-last) Defaults last
Luôn để tham số default là tham số cuối cùng của hàm.

```javascript
// bad
function handleThings(opts = {}, name) {
  // ...
}

// good
function handleThings(name, opts = {}) {
  // ...
}
```

<a name="functions--constructor"></a><a name="7.10"></a>
### [7.10](#functions--constructor) Constructor
Không sử dụng hàm khởi tạo Function để tạo mới hàm. eslint: [`no-new-func`](https://eslint.org/docs/rules/no-new-func)

> Tại sao ư? Vì tạo hàm bằng cách này giống như với hàm `eval()`, gây ra nhiều lỗ hổng.

```javascript
// bad
var add = new Function('a', 'b', 'return a + b');

// still bad
var subtract = Function('a', 'b', 'return a - b');
```

<a name="functions--signature-spacing"></a><a name="7.11"></a>
### [7.11](#functions--signature-spacing) Signature spacing
Hãy tạo các khoảng trắng đối với từ khóa `function` và block `{}`. eslint: [`space-before-function-paren`](https://eslint.org/docs/rules/space-before-function-paren) [`space-before-blocks`](https://eslint.org/docs/rules/space-before-blocks)

> Tại sao ư? Tính nhất quán là tốt, và bạn không cần phải thêm hoặc bớt khoảng trắng khi thêm hoặc xóa tên.

```javascript
// bad
const f = function(){};
const g = function (){};
const h = function() {};

// good
const x = function () {};
const y = function a() {};
```

<a name="functions--mutate-params"></a><a name="7.12"></a>
### [7.12](#functions--mutate-params) Mutate params
Đừng thay đổi các tham số. eslint: [`no-param-reassign`](https://eslint.org/docs/rules/no-param-reassign.html)

> Tại sao ư? Vì thao tác với các đối tượng được truyền vào như là tham số có thể gây ra biến không mong muốn.

```javascript
// bad
function f1(obj) {
  obj.key = 1;
}

// good
function f2(obj) {
  const key = Object.prototype.hasOwnProperty.call(obj, 'key') ? obj.key : 1;
}
```

<a name="functions--reassign-params"></a><a name="7.13"></a>
### [7.13](#functions--reassign-params) Reassign params
Đừng gán lại các tham số. eslint: [`no-param-reassign`](https://eslint.org/docs/rules/no-param-reassign.html)

> Tại sao ư? Vì việc gán lại các tham số dẫn tới hành vi không mong muốn, đặc biệt khi truy cập vào đối tượng `arguments`. Nó cũng có thể gây ra vấn đề tối ưu, đặc biệt trong V8.

```javascript
// bad
function f1(a) {
  a = 1;
  // ...
}

function f2(a) {
  if (!a) { a = 1; }
  // ...
}

// good
function f3(a) {
  const b = a || 1;
  // ...
}

function f4(a = 1) {
  // ...
}
```

<a name="functions--spread-vs-apply"></a><a name="7.14"></a>
### [7.14](#functions--spread-vs-apply) Spread vs apply
Sử dụng toán tử `...` để gọi chức năng. eslint: [`prefer-spread`](https://eslint.org/docs/rules/prefer-spread)

> Tại sao ư? Vì nó sạch hơn và không cần một ngữ cảnh hơn nữa việc xử lý `new` với `apply` là không dễ dàng.

```javascript
// bad
const x = [1, 2, 3, 4, 5];
console.log.apply(console, x);

// good
const x = [1, 2, 3, 4, 5];
console.log(...x);

// bad
new (Function.prototype.bind.apply(Date, [null, 2016, 8, 5]));

// good
new Date(...[2016, 8, 5]);
```

<a name="functions--signature-invocation-indentation"></a>
### [7.15](#functions--signature-invocation-indentation) Signature invocation indentation
Nếu hàm có nhiều tham số và được viết trên nhiều dòng thì nên có cùng khoảng cách thụt lề và kết thúc ở tham số cuối cùng là dấu phẩy. eslint: [`function-paren-newline`](https://eslint.org/docs/rules/function-paren-newline)

```javascript
// bad
function foo(bar,
             baz,
             quux) {
  // ...
}

// good
function foo(
  bar,
  baz,
  quux,
) {
  // ...
}

// bad
console.log(foo,
  bar,
  baz);

// good
console.log(
  foo,
  bar,
  baz,
);
```

Tổng hợp [Serial Javascript Style Guide](/2019/05/17/serials-javascript-style-guide/)