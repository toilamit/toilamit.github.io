---
layout: post
title: Serials Javascript Style Guide – Comments
categories: [Javascript]
date: 2019-05-27 09:00:00 +0700
description: 
img: # Add image post ex: viet-dep-zai.jpg (optional)
fig-caption: # Add figcaption (optional)
tags: [js, js style, js comment]
---

## Comments

<a name="comments--multiline"></a><a name="17.1"></a>
### [Multiline](#comments--multiline)
Sử dụng `/** ... */` khi comment nhiều dòng.

```javascript
// bad
// make() returns a new element
// based on the passed in tag name
//
// @param {String} tag
// @return {Element} element
function make(tag) {

  // ...

  return element;
}

// good
/**
 * make() returns a new element
 * based on the passed-in tag name
 */
function make(tag) {

  // ...

  return element;
}
```

<a name="comments--singleline"></a><a name="17.2"></a>
### [Singleline](#comments--singleline) 
Sử dụng `//` khi comment 1 dòng. Đặt comment phía trên đối tượng cần comment. Đặt 1 dòng trắng trước khi comment trừ phi nó là dòng đầu tiên của block.

```javascript
// bad
const active = true;  // is current tab

// good
// is current tab
const active = true;

// bad
function getType() {
  console.log('fetching type...');
  // set the default type to 'no type'
  const type = this.type || 'no type';

  return type;
}

// good
function getType() {
  console.log('fetching type...');

  // set the default type to 'no type'
  const type = this.type || 'no type';

  return type;
}

// also good
function getType() {
  // set the default type to 'no type'
  const type = this.type || 'no type';

  return type;
}
```

<a name="comments--spaces"></a>
### [Spaces](#comments--spaces) 
Tạo khoảng trắng trước khi comment sẽ giúp dễ đọc hơn. eslint: [`spaced-comment`](https://eslint.org/docs/rules/spaced-comment)

```javascript
// bad
//is current tab
const active = true;

// good
// is current tab
const active = true;

// bad
/**
 *make() returns a new element
 *based on the passed-in tag name
 */
function make(tag) {

  // ...

  return element;
}

// good
/**
 * make() returns a new element
 * based on the passed-in tag name
 */
function make(tag) {

  // ...

  return element;
}
```

<a name="comments--actionitems"></a><a name="17.3"></a>
### [Actionitems](#comments--actionitems) 
Đặt trước comment các từ như `FIXME` or `TODO` giúp cho các lập trình viên khác hiểu nhanh hơn mục đích dòng code đó. `FIXME: -- cần xem xét lại` hoặc `TODO: -- cần cải thiện`.

<a name="comments--fixme"></a><a name="17.4"></a>
### [Fixme](#comments--fixme) 
Sử dụng `// FIXME:` để chú thích các vấn đề hoặc nghĩ đó là bug

```javascript
class Calculator extends Abacus {
  constructor() {
    super();

    // FIXME: shouldn’t use a global here
    total = 0;
  }
}
```

<a name="comments--todo"></a><a name="17.5"></a>
### [Todo](#comments--todo) 
Sử dụng `// TODO:` để chú thích các giải pháp cho các vấn đề cần sửa.

```javascript
class Calculator extends Abacus {
  constructor() {
    super();

    // TODO: total should be configurable by an options param
    this.total = 0;
  }
}
```

Tổng hợp [Serial Javascript Style Guide](/2019/05/17/serials-javascript-style-guide/)