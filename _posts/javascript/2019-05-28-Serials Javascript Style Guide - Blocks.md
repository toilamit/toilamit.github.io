---
layout: post
title: Serials Javascript Style Guide – Blocks
categories: [Javascript]
date: 2019-05-27 09:00:00 +0700
description: 
img: # Add image post ex: viet-dep-zai.jpg (optional)
fig-caption: # Add figcaption (optional)
tags: [js, js style, js block]
---

## Blocks

<a name="blocks--braces"></a><a name="16.1"></a>
### [16.1](#blocks--braces) Braces
Luôn sử dụng dấu ngoặc nhọn `{}` với khối có nhiều dòng. eslint: [`nonblock-statement-body-position`](https://eslint.org/docs/rules/nonblock-statement-body-position)

```javascript
// bad
if (test)
  return false;

// good
if (test) return false;

// good
if (test) {
  return false;
}

// bad
function foo() { return false; }

// good
function bar() {
  return false;
}
```

<a name="blocks--cuddled-elses"></a><a name="16.2"></a>
### [16.2](#blocks--cuddled-elses) Cuddled elses
Nếu bạn sử dụng khối có nhiều dòng với lệnh `if` và `else`, thì đặt `else` cùng dòng với dấu ngoặc nhọn đóng của khối `if`. eslint: [`brace-style`](https://eslint.org/docs/rules/brace-style.html)

```javascript
// bad
if (test) {
  thing1();
  thing2();
}
else {
  thing3();
}

// good
if (test) {
  thing1();
  thing2();
} else {
  thing3();
}
```

<a name="blocks--no-else-return"></a><a name="16.3"></a>
### [16.3](#blocks--no-else-return) No else return
Nếu khối `if` luôn chạy lệnh `return`, thì khối `else` là không cần thiết. Nếu trong khối `else if` có `return` thì nên tách nhỏ ra làm nhiều khối `if` có chứa `return`. eslint: [`no-else-return`](https://eslint.org/docs/rules/no-else-return)

```javascript
// bad
function foo() {
  if (x) {
    return x;
  } else {
    return y;
  }
}

// bad
function cats() {
  if (x) {
    return x;
  } else if (y) {
    return y;
  }
}

// bad
function dogs() {
  if (x) {
    return x;
  } else {
    if (y) {
      return y;
    }
  }
}

// good
function foo() {
  if (x) {
    return x;
  }

  return y;
}

// good
function cats() {
  if (x) {
    return x;
  }

  if (y) {
    return y;
  }
}

// good
function dogs(x) {
  if (x) {
    if (z) {
      return y;
    }
  } else {
    return z;
  }
}
```