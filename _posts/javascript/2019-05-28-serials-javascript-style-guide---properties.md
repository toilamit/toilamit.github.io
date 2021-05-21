---
layout: post
title: Serials Javascript Style Guide – Properties
categories: [Javascript]
date: 2019-05-28 09:00:00 +0700
description: 
img: # Add image post ex: viet-dep-zai.jpg (optional)
fig-caption: # Add figcaption (optional)
tags: [js, js style, js property]
---

## Properties

<a name="properties--dot"></a><a name="12.1"></a>
### [12.1](#properties--dot) Dot
Luôn sử dụng kí hiệu dấu chấm `.` để truy xuất các thuộc tính. eslint: [`dot-notation`](https://eslint.org/docs/rules/dot-notation.html)

```javascript
const luke = {
  jedi: true,
  age: 28,
};

// bad
const isJedi = luke['jedi'];

// good
const isJedi = luke.jedi;
```

<a name="properties--bracket"></a><a name="12.2"></a>
### [12.2](#properties--bracket) Bracket
Sử dụng kí hiệu dấu ngoặc vuông `[]` khi truy xuất thuộc tính là biến.

```javascript
const luke = {
  jedi: true,
  age: 28,
};

function getProp(prop) {
  return luke[prop];
}

const isJedi = getProp('jedi');
```
<a name="es2016-properties--exponentiation-operator"></a>
### [12.3](#es2016-properties--exponentiation-operator) Exponentiation operator
Sử dụng toán tử lũy thừa `**` khi tính toán lũy thừa. eslint: [`no-restricted-properties`](https://eslint.org/docs/rules/no-restricted-properties).

```javascript
// bad
const binary = Math.pow(2, 10);

// good
const binary = 2 ** 10;
```

Tổng hợp [Serial Javascript Style Guide](/2019/05/17/serials-javascript-style-guide/)