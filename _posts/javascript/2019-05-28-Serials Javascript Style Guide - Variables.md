---
layout: post
title: Serials Javascript Style Guide – Variables
categories: [Javascript]
date: 2019-05-28 09:00:00 +0700
description: 
img: # Add image post ex: viet-dep-zai.jpg (optional)
fig-caption: # Add figcaption (optional)
tags: [js, js style, js variable]
---

## Variables

<a name="variables--const"></a><a name="13.1"></a>
### [13.1](#variables--const) Const
Luôn sử dụng `const` hoặc `let` để khai báo biến. Nếu không biến khai báo sẽ là toàn cục. eslint: [`no-undef`](https://eslint.org/docs/rules/no-undef) [`prefer-const`](https://eslint.org/docs/rules/prefer-const)

```javascript
// bad
superPower = new SuperPower(); //global variable

// good
const superPower = new SuperPower();
```

<a name="variables--one-const"></a><a name="13.2"></a>
### [13.2](#variables--one-const) One const
Chỉ sử dụng 1 `const` hoặc `let` khai báo hoặc gán cho mỗi 1 biến. eslint: [`one-var`](https://eslint.org/docs/rules/one-var.html)

> Tại sao ư? Nó dễ dàng cho việc thêm mới 1 biến khác mà k cần quan tâm tới dấu `,` hay như dấu `;`. Ngoài ra nó cho phép debug qua từng biến khai báo thay vì là nhảy qua tất cả cùng 1 lúc.

```javascript
// bad
const items = getItems(),
    goSportsTeam = true,
    dragonball = "z";

// bad
// (compare to above, and try to spot the mistake)
const items = getItems(),
    goSportsTeam = true;
    dragonball = 'z';

// good
const items = getItems();
const goSportsTeam = true;
const dragonball = 'z';
```

<a name="variables--const-let-group"></a><a name="13.3"></a>
### [13.3](#variables--const-let-group) Const let group
Nhóm tất cả `const` vào gần nhau, nhóm tất cả các `let` vào gần nhau

> Tại sao ư? Điều này hữu ích khi sau đó bạn có thể cần gán 1 biến phụ thuộc vào biến đã được gán trước đó.

```javascript
// bad
let i, len, dragonball,
    items = getItems(),
    goSportsTeam = true;

// bad
let i;
const items = getItems();
let dragonball;
const goSportsTeam = true;
let len;

// good
const goSportsTeam = true;
const items = getItems();
let dragonball;
let i;
let length;
```

<a name="variables--define-where-used"></a><a name="13.4"></a>
### [13.4](#variables--define-where-used) Define where used
Hãy gán biến ở đâu bạn cần cũng được nhưng phải hợp lý.

> Tại sao ư? `let` và `const` là khái báo phạm vi block chứ không phải function.

```javascript
// bad - unnecessary function call
function checkName(hasName) {
  const name = getName();

  if (hasName === 'test') {
    return false;
  }

  if (name === 'test') {
    this.setName('');
    return false;
  }

  return name;
}

// good
function checkName(hasName) {
  if (hasName === 'test') {
    return false;
  }

  const name = getName();

  if (name === 'test') {
    this.setName('');
    return false;
  }

  return name;
}
```
<a name="variables--no-chain-assignment"></a><a name="13.5"></a>
### [13.5](#variables--no-chain-assignment) No chain assignment
Không khai báo 1 chuỗi các biến. eslint: [`no-multi-assign`](https://eslint.org/docs/rules/no-multi-assign)

> Tại sao ư? Chaining variable assignments creates implicit global variables.

```javascript
// bad
(function example() {
  // JavaScript interprets this as
  // let a = ( b = ( c = 1 ) );
  // The let keyword only applies to variable a; variables b and c become
  // global variables.
  let a = b = c = 1;
}());

console.log(a); // throws ReferenceError
console.log(b); // 1
console.log(c); // 1

// good
(function example() {
  let a = 1;
  let b = a;
  let c = a;
}());

console.log(a); // throws ReferenceError
console.log(b); // throws ReferenceError
console.log(c); // throws ReferenceError

// the same applies for `const`
```

<a name="variables--unary-increment-decrement"></a><a name="13.6"></a>
### [13.6](#variables--unary-increment-decrement) Unary increment decrement
Tránh sử dụng toán hạng tăng - giảm (`++`, `--`). eslint [`no-plusplus`](https://eslint.org/docs/rules/no-plusplus)

> Tại sao ư? Theo tài liệu eslint, biểu thức toán hạng tăng, giảm là các đối tượng insert tự động và có thể dẫn tới lỗi ẩn bên trong ứng dụng. Có 1 cách diễn đạt giá trị tương tự là  `num += 1` thay vì `num++` hoặc `num ++`. Việc không sử dụng toán hạng tăng - giảm sẽ giúp bạn tránh được việc tăng-giảm các giá trị mà vô tình gây ra các bug không mong muốn trong chương trình.

```javascript
// bad

const array = [1, 2, 3];
let num = 1;
num++;
--num;

let sum = 0;
let truthyCount = 0;
for (let i = 0; i < array.length; i++) {
  let value = array[i];
  sum += value;
  if (value) {
    truthyCount++;
  }
}

// good

const array = [1, 2, 3];
let num = 1;
num += 1;
num -= 1;

const sum = array.reduce((a, b) => a + b, 0);
const truthyCount = array.filter(Boolean).length;
```

<a name="variables--linebreak"></a>
### [13.7](#variables--linebreak) Linebreak
Tránh sử dụng linebreaks trước hoặc sau dấu `=` trong 1 phép gán. Nếu phép gán của bạn vi phạm [`max-len`](https://eslint.org/docs/rules/max-len.html), thì hãy đặt trong dấu ngoặc đơn. eslint [`operator-linebreak`](https://eslint.org/docs/rules/operator-linebreak.html).

> Tại sao ư? Dấu linebreaks xung quanh `=` có thể làm tối nghĩa giá trị của phép gán.

```javascript
// bad
const foo =
  superLongLongLongLongLongLongLongLongFunctionName();

// bad
const foo
  = 'superLongLongLongLongLongLongLongLongString';

// good
const foo = (
  superLongLongLongLongLongLongLongLongFunctionName()
);

// good
const foo = 'superLongLongLongLongLongLongLongLongString';
```

<a name="variables--no-unused-vars"></a>
### [13.8](#variables--no-unused-vars) No unused vars
Loại bỏ các biến không sử dụng. eslint: [`no-unused-vars`](https://eslint.org/docs/rules/no-unused-vars)

> Tại sao ư? Việc khai báo các biến mà không sử dụng thì dẫn tới việc khó đọc và cảm giác như là code bị lỗi do việc refactoring chưa hoàn thành.

```javascript
// bad

var some_unused_var = 42;

// Write-only variables are not considered as used.
var y = 10;
y = 5;

// A read for a modification of itself is not considered as used.
var z = 0;
z = z + 1;

// Unused function arguments.
function getX(x, y) {
    return x;
}

// good

function getXPlusY(x, y) {
  return x + y;
}

var x = 1;
var y = a + 2;

alert(getXPlusY(x, y));

// 'type' is ignored even if unused because it has a rest property sibling.
// This is a form of extracting an object that omits the specified keys.
var { type, ...coords } = data;
// 'coords' is now the 'data' object without its 'type' property.
```

Tổng hợp [Serial Javascript Style Guide](/2019/05/17/serials-javascript-style-guide/)