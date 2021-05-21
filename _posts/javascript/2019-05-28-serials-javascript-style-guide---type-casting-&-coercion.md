---
layout: post
title: Serials Javascript Style Guide – Type Casting & Coercion
categories: [Javascript]
date: 2019-05-28 09:00:00 +0700
description: 
img: # Add image post ex: viet-dep-zai.jpg (optional)
fig-caption: # Add figcaption (optional)
tags: [js, js style, js type casting]
---

## Type Casting & Coercion

<a name="coercion--explicit"></a><a name="21.1"></a>
### [Explicit](#coercion--explicit) 
Thực hiện ép kiểu ở đầu của câu lệnh.

<a name="coercion--strings"></a><a name="21.2"></a>
### [Strings](#coercion--strings) 
Strings: eslint: [`no-new-wrappers`](https://eslint.org/docs/rules/no-new-wrappers)

```javascript
// => this.reviewScore = 9;

// bad
const totalScore = new String(this.reviewScore); // typeof totalScore is "object" not "string"

// bad
const totalScore = this.reviewScore + ''; // invokes this.reviewScore.valueOf()

// bad
const totalScore = this.reviewScore.toString(); // isn’t guaranteed to return a string

// good
const totalScore = String(this.reviewScore);
```

<a name="coercion--numbers"></a><a name="21.3"></a>
### [Numbers](#coercion--numbers) 
Numbers: Sử dụng `Number` để ép kiểu và `parseInt` thì luôn đi kèm với hệ cơ số khi parse chuỗi. eslint: [`radix`](https://eslint.org/docs/rules/radix) [`no-new-wrappers`](https://eslint.org/docs/rules/no-new-wrappers)

```javascript
const inputValue = '4';

// bad
const val = new Number(inputValue);

// bad
const val = +inputValue;

// bad
const val = inputValue >> 0;

// bad
const val = parseInt(inputValue);

// good
const val = Number(inputValue);

// good
const val = parseInt(inputValue, 10);
```

<a name="coercion--comment-deviations"></a><a name="21.4"></a>
### [Comment deviations](#coercion--comment-deviations) 
Vì bất kỳ lý do nào bạn đang làm 1 cái gì đó tùy tiện và `parseInt` là thành phần gấy ra bottleneck thì bạn cần sử dụng Bitshift vì [lý do hiệu suất](https://jsperf.com/coercion-vs-casting/3), hãy để lại comment giải thích sao bạn lại làm vậy.

```javascript
// good
/**
 * parseInt was the reason my code was slow.
 * Bitshifting the String to coerce it to a
 * Number made it a lot faster.
 */
const val = inputValue >> 0;
```

<a name="coercion--bitwise"></a><a name="21.5"></a>
### [Bitwise](#coercion--bitwise) 
**Chú ý:** Hãy cẩn thận khi sử dụng toán tử. Các kiểu số được miêu tả giống [giá trị 64-bit](https://es5.github.io/#x4.3.19), nhưng toán tử bitshift luôn trả về kiểu số nguyên 32-bit ([nguồn](https://es5.github.io/#x11.7)). Bitshift có thể dẫn tới trạng thái không mong muốn với giá trị số nguyên lớn hơn 32-bit. [Discussion](https://github.com/airbnb/javascript/issues/109). Số nguyên 32-bit có dấu lớn nhất là 2,147,483,647:

```javascript
2147483647 >> 0; // => 2147483647
2147483648 >> 0; // => -2147483648
2147483649 >> 0; // => -2147483647
```

<a name="coercion--booleans"></a><a name="21.6"></a>
### [Booleans](#coercion--booleans) 
Booleans: eslint: [`no-new-wrappers`](https://eslint.org/docs/rules/no-new-wrappers)

```javascript
const age = 0;

// bad
const hasAge = new Boolean(age);

// good
const hasAge = Boolean(age);

// best
const hasAge = !!age;
```

Tổng hợp [Serial Javascript Style Guide](/2019/05/17/serials-javascript-style-guide/)