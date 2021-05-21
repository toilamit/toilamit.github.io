---
layout: post
title: Serials Javascript Style Guide – Arrow Functions
categories: [Javascript]
date: 2019-05-27 09:00:00 +0700
description: 
img: # Add image post ex: viet-dep-zai.jpg (optional)
fig-caption: # Add figcaption (optional)
tags: [js, js style, es6, arrow function]
---

## Arrow Functions

<a name="arrows--use-them"></a><a name="8.1"></a>
### [8.1](#arrows--use-them) Use them
Nếu thực sự phải dùng hàm vô danh (như khi truyền vào 1 callback), thì sử dụng hàm mũi tên. eslint: [`prefer-arrow-callback`](https://eslint.org/docs/rules/prefer-arrow-callback.html), [`arrow-spacing`](https://eslint.org/docs/rules/arrow-spacing.html)

> Tại sao ư? Vì nó tạo ra 1 phiên bản của hàm thực thi trong ngữ cảnh của `this`, thường là những gì bạn muốn và là cú pháp ngắn gọn hơn.

> Tại sao không? Nếu là hàm phức tạp thì nên chuyển nó thành hàm với tên riêng của hàm.

```javascript
// bad
[1, 2, 3].map(function (x) {
  const y = x + 1;
  return x * y;
});

// good
[1, 2, 3].map((x) => {
  const y = x + 1;
  return x * y;
});
```

<a name="arrows--implicit-return"></a><a name="8.2"></a>
### [8.2](#arrows--implicit-return) Implicit return
Nếu thân hàm chỉ bao gồm 1 câu lệnh trả về [expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions) không có side effects thì bỏ qua dấu ngoặc và sử dụng implicit return (ngầm trả về). Mặc khác, thì vẫn dùng dấu ngoặc và lệnh `return`. eslint: [`arrow-parens`](https://eslint.org/docs/rules/arrow-parens.html), [`arrow-body-style`](https://eslint.org/docs/rules/arrow-body-style.html)

> Tại sao ư? Đó là Syntactic sugar giúp dễ đọc hơn.

```javascript
// bad
[1, 2, 3].map(number => {
  const nextNumber = number + 1;
  `A string containing the ${nextNumber}.`;
});

// good
[1, 2, 3].map(number => `A string containing the ${number + 1}.`);

// good
[1, 2, 3].map((number) => {
  const nextNumber = number + 1;
  return `A string containing the ${nextNumber}.`;
});

// good
[1, 2, 3].map((number, index) => ({
  [index]: number,
}));

// No implicit return with side effects
function foo(callback) {
  const val = callback();
  if (val === true) {
    // Do something if callback returns true
  }
}

let bool = false;

// bad
foo(() => bool = true);

// good
foo(() => {
  bool = true;
});
```

<a name="arrows--paren-wrap"></a><a name="8.3"></a>
### [8.3](#arrows--paren-wrap) Paren wrap
Để dễ đọc thì hãy bọc nhiều line bởi dấu ngoặc đơn.

```javascript
// bad
['get', 'post', 'put'].map(httpMethod => Object.prototype.hasOwnProperty.call(
    httpMagicObjectWithAVeryLongName,
    httpMethod,
  )
);

// good
['get', 'post', 'put'].map(httpMethod => (
  Object.prototype.hasOwnProperty.call(
    httpMagicObjectWithAVeryLongName,
    httpMethod,
  )
));
```

<a name="arrows--one-arg-parens"></a><a name="8.4"></a>
### [8.4](#arrows--one-arg-parens) One arg parens
Nếu hàm có 1 tham số và không sử dụng dấu ngoặc, hãy bỏ dấu ngoặc đi. Nguoawcj lại, luôn sử dụng dấu ngoặc cho các tham số để cho rõ ràng và nhất quán. Chú ý: chấp nhận luôn sử dụng dấu ngoặc đơn trong trường hợp sử dụng [“always” option](https://eslint.org/docs/rules/arrow-parens#always) với eslint. eslint: [`arrow-parens`](https://eslint.org/docs/rules/arrow-parens.html)

> Tại sao ư? Trông nó rõ ràng hơn.

```javascript
// bad
[1, 2, 3].map((x) => x * x);

// good
[1, 2, 3].map(x => x * x);

// good
[1, 2, 3].map(number => (
  `A long string with the ${number}. It’s so long that we don’t want it to take up space on the .map line!`
));

// bad
[1, 2, 3].map(x => {
  const y = x + 1;
  return x * y;
});

// good
[1, 2, 3].map((x) => {
  const y = x + 1;
  return x * y;
});
```

<a name="arrows--confusing"></a><a name="8.5"></a>
### [8.5](#arrows--confusing) Confusing
Tránh nhầm lẫn cú pháp hàm mũi tên (`=>`) với toán tử so sánh (`<=`, `>=`). eslint: [`no-confusing-arrow`](https://eslint.org/docs/rules/no-confusing-arrow)

```javascript
// bad
const itemHeight = item => item.height <= 256 ? item.largeSize : item.smallSize;

// bad
const itemHeight = (item) => item.height >= 256 ? item.largeSize : item.smallSize;

// good
const itemHeight = item => (item.height <= 256 ? item.largeSize : item.smallSize);

// good
const itemHeight = (item) => {
  const { height, largeSize, smallSize } = item;
  return height <= 256 ? largeSize : smallSize;
};
```

<a name="whitespace--implicit-arrow-linebreak"></a>
### [8.6](#whitespace--implicit-arrow-linebreak) Implicit arrow linebreak
Thực hiện vị trí thân hàm mũi tên với các trả về ngầm định. eslint: [`implicit-arrow-linebreak`](https://eslint.org/docs/rules/implicit-arrow-linebreak)

```javascript
// bad
foo =>
  bar;

foo =>
  (bar);

// good
foo => bar;
foo => (bar);
foo => (
   bar
)
```

Tổng hợp [Serial Javascript Style Guide](/2019/05/17/serials-javascript-style-guide/)