---
layout: post
title: Do you understand "this" keyword in Javascript? Can you answer 7 snippets questions?
categories: [Javascript]
date: 2021-03-30 09:00:00 +0700
description: In Javascript this keyword is the function invocation context and it's complex to understand. This keyword can be a global object or the function scope object.
img: js-you-can-do-it.jpeg
fig-caption: # Add figcaption (optional)
tags: [js, javascript this, this javascript, javascript interview]
---

In JavaScript `this` is the function invocation context.

In this post, you can learn 7 ways to work with `this` by simple examples.

Let's do if you can do with all of them.

Feel free to write your solution in a comment below!

### 1. Variable vs property

```js
const object = {
  message: 'Hello, World!',

  getMessage() {
    const message = 'Hello, Earth!';
    return this.message;
  }
};

console.log(object.getMessage()); // What is logged?

```

### 2. Cat name

```js
function Pet(name) {
  this.name = name;

  this.getName = () => this.name;
}

const cat = new Pet('Fluffy');

console.log(cat.getName()); // What is logged?

const { getName } = cat;
console.log(getName());     // What is logged?
```

### 3. Delay

```js
const object = {
  message: 'Hello, World!',

  logMessage() {
    console.log(this.message); // What is logged?
  }
};

setTimeout(object.logMessage, 1000);
```

### 4. Artificial method

How can you call `logMessage` function and it logs `"Hello, World!"`?

```js
const object = {
  message: 'Hello, World!'
};

function logMessage() {
  console.log(this.message); // "Hello, World!"
}

// Write your code here...
```

### 5. Greeting and farewell

```js
const object = {
  who: 'World',

  greet() {
    return `Hello, ${this.who}!`;
  },

  farewell: () => {
    return `Goodbye, ${this.who}!`;
  }
};

console.log(object.greet());    // What is logged?
console.log(object.farewell()); // What is logged?
```

### 6. Tricky length

```js
var length = 4;
function callback() {
  console.log(this.length); // What is logged?
}

const object = {
  length: 5,
  method(callback) {
    callback();
  }
};

object.method(callback, 1, 2);
```

### 7. Calling arguments

```js
var length = 4;
function callback() {
  console.log(this.length); // What is logged?
}

const object = {
  length: 5,
  method() {
    arguments[0]();
  }
};

object.method(callback, 1, 2);
```

Hola! Don't hesitate to leave a comment about your answer. ;)

## Refs
- <a href="https://dmitripavlutin.com/javascript-this-interview-questions/">https://dmitripavlutin.com/javascript-this-interview-questions/</a>