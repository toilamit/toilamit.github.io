---
layout: post
title: Serials Javascript Style Guide – Destructuring
categories: [Javascript]
date: 2019-05-27 09:00:00 +0700
description: 
img: # Add image post ex: viet-dep-zai.jpg (optional)
fig-caption: # Add figcaption (optional)
tags: [js, js style]
---

## Destructuring

<a name="destructuring--object"></a><a name="5.1"></a>
### [5.1](#destructuring--object) Object
Khi mà muốn sử dụng nhiều thuộc tính của object thì nên sử dụng object destructuring. eslint: [`prefer-destructuring`](https://eslint.org/docs/rules/prefer-destructuring)

> Tại sao ư? Nhằm tránh tạo các temporary references

```javascript
// bad
function getFullName(user) {
  const firstName = user.firstName;
  const lastName = user.lastName;

  return `${firstName} ${lastName}`;
}

// good
function getFullName(user) {
  const { firstName, lastName } = user;
  return `${firstName} ${lastName}`;
}

// best
function getFullName({ firstName, lastName }) {
  return `${firstName} ${lastName}`;
}
```

<a name="destructuring--array"></a><a name="5.2"></a>
### [5.2](#destructuring--array) Array
Hãy sử dụng array destructuring. eslint: [`prefer-destructuring`](https://eslint.org/docs/rules/prefer-destructuring)

```javascript
const arr = [1, 2, 3, 4];

// bad
const first = arr[0];
const second = arr[1];

// good
const [first, second] = arr;
```

<a name="destructuring--object-over-array"></a><a name="5.3"></a>
### [5.3](#destructuring--object-over-array) Object over array
Sử dụng object destructuring khi trả về nhiều giá trị, không dùng array destructuring.

> Tại sao ư? Vì bạn có thể thêm các thuộc tính mới hoặc thay đổi thứ tự của chúng mà không làm hỏng cách gọi nó.

```javascript
// bad
function processInput(input) {
  // then a miracle occurs
  return [left, right, top, bottom];
}

// the caller needs to think about the order of return data
const [left, __, top] = processInput(input);

// good
function processInput(input) {
  // then a miracle occurs
  return { left, right, top, bottom };
}

// the caller selects only the data they need
const { left, top } = processInput(input);
```

Tổng hợp [Serial Javascript Style Guide](/2019/05/17/serials-javascript-style-guide/)