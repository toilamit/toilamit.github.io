---
layout: post
title: Serials Javascript Style Guide – Accessors
categories: [Javascript]
date: 2019-05-28 09:00:00 +0700
description: 
img: # Add image post ex: viet-dep-zai.jpg (optional)
fig-caption: # Add figcaption (optional)
tags: [js, js style]
---

## Accessors

<a name="accessors--not-required"></a><a name="23.1"></a>
### [Not required](#accessors--not-required) 
Không bắt buộc hàm truy cập đối với các thuộc tính

<a name="accessors--no-getters-setters"></a><a name="23.2"></a>
### [No getters-setters](#accessors--no-getters-setters) 
Không dùng JavaScript getters/setters vì chúng gây ra side effects không mong muốn và khó test, maintain, và vài lý do khác. Vì thế nên sử dụng `getVal()` và `setVal('hello')` nếu muốn có hàm truy cập.

```javascript
// bad
class Dragon {
  get age() {
    // ...
  }

  set age(value) {
    // ...
  }
}

// good
class Dragon {
  getAge() {
    // ...
  }

  setAge(value) {
    // ...
  }
}
```

<a name="accessors--boolean-prefix"></a><a name="23.3"></a>
### [Boolean prefix](#accessors--boolean-prefix) 
nếu property/method là kiểu `boolean`, thì sử dụng `isVal()` hoặc `hasVal()`.

```javascript
// bad
if (!dragon.age()) {
  return false;
}

// good
if (!dragon.hasAge()) {
  return false;
}
```

<a name="accessors--consistent"></a><a name="23.4"></a>
### [Consistent](#accessors--consistent) 
Phải nhất quán việc tạo hàm `get()` và `set()`.

```javascript
class Jedi {
  constructor(options = {}) {
    const lightsaber = options.lightsaber || 'blue';
    this.set('lightsaber', lightsaber);
  }

  set(key, val) {
    this[key] = val;
  }

  get(key) {
    return this[key];
  }
}
```

Tổng hợp [Serial Javascript Style Guide](/2019/05/17/serials-javascript-style-guide/)