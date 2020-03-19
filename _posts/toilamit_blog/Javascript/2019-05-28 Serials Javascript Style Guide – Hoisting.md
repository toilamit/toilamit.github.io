Serials Javascript Style Guide – Hoisting

## Hoisting

<a name="hoisting--about"></a><a name="14.1"></a>
### [14.1](#hoisting--about) About
Khái báo `var` được đưa lên đầu phạm vi hàm gần nhất, còn các phép gán thì không. Các khai báo `const` và `let` được biết đến với nội dung [Temporal Dead Zones (TDZ)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#Temporal_Dead_Zone). Nó quan trọng để biết rằng [typeof không an toàn](http://es-discourse.com/t/why-typeof-is-no-longer-safe/15).

```javascript
// we know this wouldn’t work (assuming there
// is no notDefined global variable)
function example() {
  console.log(notDefined); // => throws a ReferenceError
}

// creating a variable declaration after you
// reference the variable will work due to
// variable hoisting. Note: the assignment
// value of `true` is not hoisted.
function example() {
  console.log(declaredButNotAssigned); // => undefined
  var declaredButNotAssigned = true;
}

// the interpreter is hoisting the variable
// declaration to the top of the scope,
// which means our example could be rewritten as:
function example() {
  let declaredButNotAssigned;
  console.log(declaredButNotAssigned); // => undefined
  declaredButNotAssigned = true;
}

// using const and let
function example() {
  console.log(declaredButNotAssigned); // => throws a ReferenceError
  console.log(typeof declaredButNotAssigned); // => throws a ReferenceError
  const declaredButNotAssigned = true;
}
```

<a name="hoisting--anon-expressions"></a><a name="14.2"></a>
### [14.2](#hoisting--anon-expressions) Anonymous expressions
Biểu thức hàm ẩn danh hoist tên biến nhưng không là hàm gán.

```javascript
function example() {
  console.log(anonymous); // => undefined

  anonymous(); // => TypeError anonymous is not a function

  var anonymous = function () {
    console.log('anonymous function expression');
  };
}
```

<a name="hoisting--named-expresions"></a><a name="hoisting--named-expressions"></a><a name="14.3"></a>
### [14.3](#hoisting--named-expressions) Named expressions
Biểu thức hàm đặt tên hoist tên biến, không phải tên hàm hoặc thân hàm.

```javascript
function example() {
  console.log(named); // => undefined

  named(); // => TypeError named is not a function

  superPower(); // => ReferenceError superPower is not defined

  var named = function superPower() {
    console.log('Flying');
  };
}

// the same is true when the function name
// is the same as the variable name.
function example() {
  console.log(named); // => undefined

  named(); // => TypeError named is not a function

  var named = function named() {
    console.log('named');
  };
}
```

<a name="hoisting--declarations"></a><a name="14.4"></a>
### [14.4](#hoisting--declarations) Declarations
Khai báo hàm hoist tên và thân hàm.

```javascript
function example() {
  superPower(); // => Flying

  function superPower() {
    console.log('Flying');
  }
}
```

- Xem thêm về [JavaScript Scoping & Hoisting](http://www.adequatelygood.com/2010/2/JavaScript-Scoping-and-Hoisting/) viết bởi [Ben Cherry](http://www.adequatelygood.com/).

Tổng hợp [Serial Javascript Style Guide](/2019/05/17/serials-javascript-style-guide/)