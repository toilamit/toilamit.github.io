---
layout: post
title: Serials Javascript Style Guide – Iterators and Generators
categories: [Javascript]
date: 2019-05-27 09:00:00 +0700
description: 
img: # Add image post ex: viet-dep-zai.jpg (optional)
fig-caption: # Add figcaption (optional)
tags: [js, js style, js iterator, js generator]
---

## Iterators and Generators

<a name="iterators--nope"></a><a name="11.1"></a>
### [11.1](#iterators--nope) Nope
Không sử dụng các vòng lặp. Khuyến khích sử dụng các higher-order functions thay vì các vòng lặp như `for-in` or `for-of`. eslint: [`no-iterator`](https://eslint.org/docs/rules/no-iterator.html) [`no-restricted-syntax`](https://eslint.org/docs/rules/no-restricted-syntax)

> Tại sao ư? Hãy hiểu đây là quy tắc bất di bất dịch. Vì việc hàm thuần túy trả về giá trị luôn dễ hơn so với side effects

> Hãy sử dụng `map()` / `every()` / `filter()` / `find()` / `findIndex()` / `reduce()` / `some()` / ... để lặp với array, và `Object.keys()` / `Object.values()` / `Object.entries()` để tạo ra array và do đó cũng có thể lặp với objects.

```javascript
const numbers = [1, 2, 3, 4, 5];

// bad
let sum = 0;
for (let num of numbers) {
  sum += num;
}
sum === 15;

// good
let sum = 0;
numbers.forEach((num) => {
  sum += num;
});
sum === 15;

// best (use the functional force)
const sum = numbers.reduce((total, num) => total + num, 0);
sum === 15;

// bad
const increasedByOne = [];
for (let i = 0; i < numbers.length; i++) {
  increasedByOne.push(numbers[i] + 1);
}

// good
const increasedByOne = [];
numbers.forEach((num) => {
  increasedByOne.push(num + 1);
});

// best (keeping it functional)
const increasedByOne = numbers.map(num => num + 1);
```

<a name="generators--nope"></a><a name="11.2"></a>
### [11.2](#generators--nope) Nope
Bây giờ bạn không nên sử dụng `generators`.

> Tại sao ư? Vì việc chuyển đổi code sang ES5 chưa được hỗ trợ tốt nhất.

<a name="generators--spacing"></a>
### [11.3](#generators--spacing) Spacing
Nếu bạn bắt buộc phải sử dụng generators hoặc nếu bạn phớt lờ [lời khuyên](#generators--nope), thì hãy chắc chắn rằng ký hiệu function có khoảng trắng hợp lý. eslint: [`generator-star-spacing`](https://eslint.org/docs/rules/generator-star-spacing)

> Tại sao ư? `function` và `*` luôn là từ khóa trong cùng 1 khái niệm - `*` không là modifier cho `function`, `function*` là 1 cấu trúc duy nhất, khác với `function`.

```javascript
// bad
function * foo() {
  // ...
}

// bad
const bar = function * () {
  // ...
};

// bad
const baz = function *() {
  // ...
};

// bad
const quux = function*() {
  // ...
};

// bad
function*foo() {
  // ...
}

// bad
function *foo() {
  // ...
}

// very bad
function
*
foo() {
  // ...
}

// very bad
const wat = function
*
() {
  // ...
};

// good
function* foo() {
  // ...
}

// good
const foo = function* () {
  // ...
};
```

Tổng hợp [Serial Javascript Style Guide](/2019/05/17/serials-javascript-style-guide/)