---
layout: post
title: Serials Javascript Style Guide – Comparison Operators & Equality
categories: [Javascript]
date: 2019-05-27 09:00:00 +0700
description: 
img: # Add image post ex: viet-dep-zai.jpg (optional)
fig-caption: # Add figcaption (optional)
tags: [js, js style, js operator]
---

## Comparison Operators & Equality

<a name="comparison--eqeqeq"></a><a name="15.1"></a>
### [15.1](#comparison--eqeqeq) Eqeqeq
Sử dụng dấu `===` và `!==` thay cho `==` và `!=`. eslint: [`eqeqeq`](https://eslint.org/docs/rules/eqeqeq.html)

<a name="comparison--if"></a><a name="15.2"></a>
### [15.2](#comparison--if) If
Một số các quy định bên trong điều kiện lệnh `if`:

- **Objects** tương đương **true**
- **Undefined** tương đương **false**
- **Null** tương đương **false**
- **Booleans** tương đương **giá trị của boolean**
- **Numbers** tương đương **false** nếu là **+0, -0, hoặc NaN**, ngược lại là **true**
- **Strings** tương đương **false** nếu là chuỗi rỗng `''`, ngược lại là **true**

```javascript
if ([0] && []) {
  // true
  // an array (even an empty one) is an object, objects will evaluate to true
}
```

<a name="comparison--shortcuts"></a><a name="15.3"></a>
### [15.3](#comparison--shortcuts) Shortcuts
Chỉ sử dụng shortcuts với các kiểu `boolean`. So sánh string, number thì cần rõ ràng.

```javascript
// bad
if (isValid === true) {
  // ...
}

// good
if (isValid) {
  // ...
}

// bad
if (name) {
  // ...
}

// good
if (name !== '') {
  // ...
}

// bad
if (collection.length) {
  // ...
}

// good
if (collection.length > 0) {
  // ...
}
```

<a name="comparison--moreinfo"></a><a name="15.4"></a>
### [15.4](#comparison--moreinfo) Moreinfo
Tham khảo thêm [Truth Equality and JavaScript](https://javascriptweblog.wordpress.com/2011/02/07/truth-equality-and-javascript/#more-2108) viết bởi Angus Croll.

<a name="comparison--switch-blocks"></a><a name="15.5"></a>
### [15.5](#comparison--switch-blocks) Switch block
Sử dụng các dấu ngoặc nhọn trong mệnh đề  `case` và `default` nếu sử dụng thêm các khai báo. (ví dụ: `let`, `const`, `function`, và `class`). eslint: [`no-case-declarations`](https://eslint.org/docs/rules/no-case-declarations.html)

> Tại sao ư? Các khai báo lexical xuất hiện trong khối `switch` nhưng nó chỉ nhận giá trị khởi tạo khi gán, chỉ xảy ra khi gọi tới `case` của nó. Điều này dẫn tới vấn đề khi nhiều mệnh đề `case` định nghĩa cùng 1 vấn đề giống nhau.

```javascript
// bad
switch (foo) {
  case 1:
    let x = 1;
    break;
  case 2:
    const y = 2;
    break;
  case 3:
    function f() {
      // ...
    }
    break;
  default:
    class C {}
}

// good
switch (foo) {
  case 1: {
    let x = 1;
    break;
  }
  case 2: {
    const y = 2;
    break;
  }
  case 3: {
    function f() {
      // ...
    }
    break;
  }
  case 4:
    bar();
    break;
  default: {
    class C {}
  }
}
```

<a name="comparison--nested-ternaries"></a><a name="15.6"></a>
### [15.6](#comparison--nested-ternaries) Nested ternaries
Ternaries (tam phân) không nên lồng nhau mà nên tách riêng ra thành từng biểu thức đơn. eslint: [`no-nested-ternary`](https://eslint.org/docs/rules/no-nested-ternary.html)

```javascript
// bad
const foo = maybe1 > maybe2
  ? "bar"
  : value1 > value2 ? "baz" : null;

// split into 2 separated ternary expressions
const maybeNull = value1 > value2 ? 'baz' : null;

// better
const foo = maybe1 > maybe2
  ? 'bar'
  : maybeNull;

// best
const foo = maybe1 > maybe2 ? 'bar' : maybeNull;
```

<a name="comparison--unneeded-ternary"></a><a name="15.7"></a>
### [15.7](#comparison--unneeded-ternary) Unneeded ternary
Tránh các tam phân không cần thiết. eslint: [`no-unneeded-ternary`](https://eslint.org/docs/rules/no-unneeded-ternary.html)

```javascript
// bad
const foo = a ? a : b;
const bar = c ? true : false;
const baz = c ? false : true;

// good
const foo = a || b;
const bar = !!c;
const baz = !c;
```

<a name="comparison--no-mixed-operators"></a>
### [15.8](#comparison--no-mixed-operators) No mixed operators
Khi kết hợp các toán tử thì hãy gộp lại trong cặp ngoặc đơn `()`. Chỉ có ngoại lệ là các toán tử số học chuẩn (`+`, `-`, `*`, & `/`) vì sự ưu tiên của chúng là dễ hiểu. eslint: [`no-mixed-operators`](https://eslint.org/docs/rules/no-mixed-operators.html)

> Tại sao ư? Việc làm này code dễ đọc và làm rõ mục đích của các lập trình viên.

```javascript
// bad
const foo = a && b < 0 || c > 0 || d + 1 === 0;

// bad
const bar = a ** b - 5 % d;

// bad
// one may be confused into thinking (a || b) && c
if (a || b && c) {
  return d;
}

// good
const foo = (a && b < 0) || c > 0 || (d + 1 === 0);

// good
const bar = (a ** b) - (5 % d);

// good
if (a || (b && c)) {
  return d;
}

// good
const bar = a + b / c * d;
```