---
layout: post
title: Serials Javascript Style Guide – Control Statements
categories: [Javascript]
date: 2019-05-27 09:00:00 +0700
description: 
img: # Add image post ex: viet-dep-zai.jpg (optional)
fig-caption: # Add figcaption (optional)
tags: [js, js style]
---

## Control Statements

<a name="control-statements"></a>
### [Statements](#control-statements)
Trong trường hợp các lệnh điều khiển (`if`, `while` etc.) quá dài hoặc vượt quá độ dài tối đa cho phép, thì mỗi điều kiện (đã được nhóm lại) có thể đặt vào 1 dòng mới. Các toán tử logic nên đặt ở đầu dòng.

> Tại sao ư? Việc đặt các toán tử logic ở đầu dòng giúp căn lề tốt và dễ đọc hơn.

```javascript
// bad
if ((foo === 123 || bar === 'abc') && doesItLookGoodWhenItBecomesThatLong() && isThisReallyHappening()) {
  thing1();
}

// bad
if (foo === 123 &&
  bar === 'abc') {
  thing1();
}

// bad
if (foo === 123
  && bar === 'abc') {
  thing1();
}

// bad
if (
  foo === 123 &&
  bar === 'abc'
) {
  thing1();
}

// good
if (
  foo === 123
  && bar === 'abc'
) {
  thing1();
}

// good
if (
  (foo === 123 || bar === 'abc')
  && doesItLookGoodWhenItBecomesThatLong()
  && isThisReallyHappening()
) {
  thing1();
}

// good
if (foo === 123 && bar === 'abc') {
  thing1();
}
```

<a name="control-statements--value-selection"></a>
### [Value selection](#control-statements--value-selection)
Không sử dụng các toán tử lựa chọn tại nơi có lệnh điều khiển.

```javascript
// bad
!isRunning && startRunning();

// good
if (!isRunning) {
  startRunning();
}
```
