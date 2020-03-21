---
layout: post
title: Serials Javascript Style Guide – Strings
categories: [Javascript]
date: 2019-05-27 09:00:00 +0700
description: 
img: # Add image post ex: viet-dep-zai.jpg (optional)
fig-caption: # Add figcaption (optional)
tags: [js, js style, js string]
---

## Strings

<a name="strings--quotes"></a><a name="6.1"></a>
### [6.1](#strings--quotes) Quotes
Sử dụng dấu nháy đơn `''` đối với strings. eslint: [`quotes`](https://eslint.org/docs/rules/quotes.html)

```javascript
// bad
const name = "Capt. Janeway";

// bad - template literals should contain interpolation or newlines
const name = `Capt. Janeway`;

// good
const name = 'Capt. Janeway';
```

<a name="strings--line-length"></a><a name="6.2"></a>
### [6.2](#strings--line-length) Line length
Không nên nối chuỗi nếu chuỗi quá dài.

> Tại sao ư? Thật không dễ làm việc với các chuỗi đã chia nhỏ và điều này làm cho việc tìm kiếm kém hiệu quả hơn.

```javascript
// bad
const errorMessage = 'This is a super long error that was thrown because \
of Batman. When you stop to think about how Batman had anything to do \
with this, you would get nowhere \
fast.';

// bad
const errorMessage = 'This is a super long error that was thrown because ' +
  'of Batman. When you stop to think about how Batman had anything to do ' +
  'with this, you would get nowhere fast.';

// good
const errorMessage = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.';
```

<a name="es6-template-literals"></a><a name="6.4"></a>
### [6.3](#es6-template-literals) Template literals
Hãy sử dụng template strings thay vì việc phải nối chuỗi. eslint: [`prefer-template`](https://eslint.org/docs/rules/prefer-template.html) [`template-curly-spacing`](https://eslint.org/docs/rules/template-curly-spacing)

> Tại sao ư? Vì nó giúp code dễ đọc và không lo ngại việc xuống dòng nếu như cần xuống dòng.

```javascript
// bad
function sayHi(name) {
  return 'How are you, ' + name + '?';
}

// bad
function sayHi(name) {
  return ['How are you, ', name, '?'].join();
}

// bad
function sayHi(name) {
  return `How are you, ${ name }?`;
}

// good
function sayHi(name) {
  return `How are you, ${name}?`;
}
```

<a name="strings--eval"></a><a name="6.5"></a>
### [6.4](#strings--eval) Eval
Đừng bao giờ sử dụng `eval()` trong 1 chuỗi vì nó tạo ra quá nhiều lỗ hổng. eslint: [`no-eval`](https://eslint.org/docs/rules/no-eval)

<a name="strings--escaping"></a>
### [6.5](#strings--escaping) Escaping
Không cần thiết escape các ký tự trong chuỗi. eslint: [`no-useless-escape`](https://eslint.org/docs/rules/no-useless-escape)

> Tại sao ư? Vì dấu gạch chéo ngược gây khó đọc và chỉ nên sử dụng khi cần thiết.

```javascript
// bad
const foo = '\'this\' \i\s \"quoted\"';

// good
const foo = '\'this\' is "quoted"';
const foo = `my name is '${name}'`;
```

Tổng hợp [Serial Javascript Style Guide](/2019/05/17/serials-javascript-style-guide/)