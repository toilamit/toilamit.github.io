Serials Javascript Style Guide – Classes & Constructors

## Classes & Constructors

<a name="constructors--use-class"></a><a name="9.1"></a>
### [9.1](#constructors--use-class) Use class
Luôn sử dụng `class`. Tránh thao tác trực tiếp `prototype`.

> Tại sao ư? `class` ngắn gọn và dễ hiểu hơn.

```javascript
// bad
function Queue(contents = []) {
  this.queue = [...contents];
}
Queue.prototype.pop = function () {
  const value = this.queue[0];
  this.queue.splice(0, 1);
  return value;
};

// good
class Queue {
  constructor(contents = []) {
    this.queue = [...contents];
  }
  pop() {
    const value = this.queue[0];
    this.queue.splice(0, 1);
    return value;
  }
}
```

<a name="constructors--extends"></a><a name="9.2"></a>
### [9.2](#constructors--extends) Extends
Hãy sử dụng `extends` để kế thừa.

> Tại sao ư? Vì nó là cách tích hợp để kế thừa toàn bộ prototype mà không phá vỡ `instanceof`.

```javascript
// bad
const inherits = require('inherits');
function PeekableQueue(contents) {
  Queue.apply(this, contents);
}
inherits(PeekableQueue, Queue);
PeekableQueue.prototype.peek = function () {
  return this.queue[0];
};

// good
class PeekableQueue extends Queue {
  peek() {
    return this.queue[0];
  }
}
```

<a name="constructors--chaining"></a><a name="9.3"></a>
### [9.3](#constructors--chaining) Chaining
Các phương thức trả về `this` để trợ giúp cho chuỗi phương thức.

```javascript
// bad
Jedi.prototype.jump = function () {
  this.jumping = true;
  return true;
};

Jedi.prototype.setHeight = function (height) {
  this.height = height;
};

const luke = new Jedi();
luke.jump(); // => true
luke.setHeight(20); // => undefined

// good
class Jedi {
  jump() {
    this.jumping = true;
    return this;
  }

  setHeight(height) {
    this.height = height;
    return this;
  }
}

const luke = new Jedi();

luke.jump()
  .setHeight(20);
```

<a name="constructors--tostring"></a><a name="9.4"></a>
### [9.4](#constructors--tostring) Tostring
Có thể custom phương thức `toString()` miễn sao nó hoạt động tốt và không gây ra side effects.

```javascript
class Jedi {
  constructor(options = {}) {
    this.name = options.name || 'no name';
  }

  getName() {
    return this.name;
  }

  toString() {
    return `Jedi - ${this.getName()}`;
  }
}
```

<a name="constructors--no-useless"></a><a name="9.5"></a>
### [9.5](#constructors--no-useless) No useless
Class có 1 hàm tạo mặc định nếu không được chỉ định. Nếu hàm tạo rỗng hoặc chỉ định tới cha nó thì là không cần thiết. eslint: [`no-useless-constructor`](https://eslint.org/docs/rules/no-useless-constructor)

```javascript
// bad
class Jedi {
  constructor() {}

  getName() {
    return this.name;
  }
}

// bad
class Rey extends Jedi {
  constructor(...args) {
    super(...args);
  }
}

// good
class Rey extends Jedi {
  constructor(...args) {
    super(...args);
    this.name = 'Rey';
  }
}
```

<a name="classes--no-duplicate-members"></a>
### [9.6](#classes--no-duplicate-members) No duplicate members
Tránh trùng lặp các thành viên trong class. eslint: [`no-dupe-class-members`](https://eslint.org/docs/rules/no-dupe-class-members)

> Tại sao ư? Nếu trùng lặp thì sẽ sử dụng thành viên cuối cùng, hoặc chắc chắn nó là lỗi.

```javascript
// bad
class Foo {
  bar() { return 1; }
  bar() { return 2; }
}

// good
class Foo {
  bar() { return 1; }
}

// good
class Foo {
  bar() { return 2; }
}
```

Tổng hợp [Serial Javascript Style Guide](/2019/05/17/serials-javascript-style-guide/)