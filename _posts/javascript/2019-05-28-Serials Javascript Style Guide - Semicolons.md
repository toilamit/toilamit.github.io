---
layout: post
title: Serials Javascript Style Guide – Semicolons
categories: [Javascript]
date: 2019-05-28 09:00:00 +0700
description: 
img: # Add image post ex: viet-dep-zai.jpg (optional)
fig-caption: # Add figcaption (optional)
tags: [js, js style, js semicolon]
---

## Semicolons

<a name="semicolons--required"></a><a name="20.1"></a>
### [Required](#semicolons--required) 
**Luôn dùng.** eslint: [`semi`](https://eslint.org/docs/rules/semi.html)

> Tại sao ư? Khi Javascript gặp 1 dòng mà không có dấu chấm phẩy, thì nó sẽ mặc định sử dụng quy tắc gọi là [Automatic Semicolon Insertion](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion) để cân nhắc xem đó là kết thúc của câu lệnh hay không, và nó ngầm hiểu là sẽ thêm dấu chấm phẩy khi xuống dòng. ASI có 1 vài các hành vi sai lệch và dẫn tới code sẽ bị hỏng nếu Javascript hiểu sai xuống dòng. Những quy tắc này sẽ trở nên phức tạp hơn vì các tính năng trở thành 1 phần của Javascript. Nếu không muốn gặp phải bug bất thình lình thì bạn nên sử dụng linter để check việc thiếu dấu chấm phẩy.

```javascript
// bad - raises exception
const luke = {}
const leia = {}
[luke, leia].forEach(jedi => jedi.father = 'vader')

// bad - raises exception
const reaction = "No! That’s impossible!"
(async function meanwhileOnTheFalcon() {
  // handle `leia`, `lando`, `chewie`, `r2`, `c3p0`
  // ...
}())

// bad - returns `undefined` instead of the value on the next line - always happens when `return` is on a line by itself because of ASI!
function foo() {
  return
    'search your feelings, you know it to be foo'
}

// good
const luke = {};
const leia = {};
[luke, leia].forEach((jedi) => {
  jedi.father = 'vader';
});

// good
const reaction = "No! That’s impossible!";
(async function meanwhileOnTheFalcon() {
  // handle `leia`, `lando`, `chewie`, `r2`, `c3p0`
  // ...
}());

// good
function foo() {
  return 'search your feelings, you know it to be foo';
}
```

[Đọc thêm](https://stackoverflow.com/questions/7365172/semicolon-before-self-invoking-function/7365214#7365214).

Tổng hợp [Serial Javascript Style Guide](/2019/05/17/serials-javascript-style-guide/)
