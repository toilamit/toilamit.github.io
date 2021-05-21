---
layout: post
title: Serials Javascript Style Guide – Standard Library
categories: [Javascript]
date: 2019-06-07 09:00:00 +0700
description: 
img: # Add image post ex: viet-dep-zai.jpg (optional)
fig-caption: # Add figcaption (optional)
tags: [js, js style]
---

## Standard Library

[Standard Library](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects) chứa các tiện ích mà chức năng bị hỏng nhưng duy trì cho lý do kế thừa.

<a name="standard-library--isnan"></a>
### [29.1](#standard-library--isnan) isNaN
Nên dùng `Number.isNaN` thay vì hàm toàn cục `isNaN`. eslint: [`no-restricted-globals`](https://eslint.org/docs/rules/no-restricted-globals)

> Tại sao ư? Hàm toàn cục `isNaN` ép giá trị không phải kiểu số sang kiểu số, trả giá trị true cho mọi thứ mà ép được về NaN.
> Nếu điều này được yêu cầu thì hãy làm nó rõ ràng.

```javascript
// bad
isNaN('1.2'); // false
isNaN('1.2.3'); // true

// good
Number.isNaN('1.2.3'); // false
Number.isNaN(Number('1.2.3')); // true
```

<a name="standard-library--isfinite"></a>
### [29.2](#standard-library--isfinite) Isfinite
Nên dùng `Number.isFinite` thay vì hàm toàn cục `isFinite`. eslint: [`no-restricted-globals`](https://eslint.org/docs/rules/no-restricted-globals)

> Tại sao ư? Vì hàm toàn cục `isFinite` ép giá trị không phải kiểu số sang kiểu số, trả giá trị true cho mọi thứ mà ép được về số hữu hạn.
> Nếu điều này được yêu cầu thì hãy làm nó rõ ràng.

```javascript
// bad
isFinite('2e3'); // true

// good
Number.isFinite('2e3'); // false
Number.isFinite(parseInt('2e3', 10)); // true
```

Tổng hợp [Serial Javascript Style Guide](/2019/05/17/serials-javascript-style-guide/)