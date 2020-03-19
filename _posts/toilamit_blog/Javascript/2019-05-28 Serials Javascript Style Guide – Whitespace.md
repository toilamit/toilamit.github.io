Serials Javascript Style Guide – Whitespace

## Whitespace

<a name="whitespace--spaces"></a><a name="18.1"></a>
### [Spaces](#whitespace--spaces) 
Sử dụng tab mềm (kí tự khoảng trắng) với 2 khoảng trắng. eslint: [`indent`](https://eslint.org/docs/rules/indent.html)

```javascript
// bad
function foo() {
∙∙∙∙let name;
}

// bad
function bar() {
∙let name;
}

// good
function baz() {
∙∙let name;
}
```

<a name="whitespace--before-blocks"></a><a name="18.2"></a>
### [Before blocks](#whitespace--before-blocks) 
Thêm 1 khoảng trắng trước khi bắt đầu dấu ngoặc. eslint: [`space-before-blocks`](https://eslint.org/docs/rules/space-before-blocks.html)

```javascript
// bad
function test(){
  console.log('test');
}

// good
function test() {
  console.log('test');
}

// bad
dog.set('attr',{
  age: '1 year',
  breed: 'Bernese Mountain Dog',
});

// good
dog.set('attr', {
  age: '1 year',
  breed: 'Bernese Mountain Dog',
});
```

<a name="whitespace--around-keywords"></a><a name="18.3"></a>
### [Around keywords](#whitespace--around-keywords) 
Thêm 1 khoảng trắng trước dấu ngoặc đơn mở trong các lệnh điều khiển (`if`, `while` etc.). Không thêm khoảng trắng vào giữa danh sách các tham số và tên hàm khi gọi hàm và trong khai báo hàm. eslint: [`keyword-spacing`](https://eslint.org/docs/rules/keyword-spacing.html)

```javascript
// bad
if(isJedi) {
  fight ();
}

// good
if (isJedi) {
  fight();
}

// bad
function fight () {
  console.log ('Swooosh!');
}

// good
function fight() {
  console.log('Swooosh!');
}
```

<a name="whitespace--infix-ops"></a><a name="18.4"></a>
### [Infix ops](#whitespace--infix-ops) 
Sử dụng toán tử có khoảng trắng. eslint: [`space-infix-ops`](https://eslint.org/docs/rules/space-infix-ops.html)

```javascript
// bad
const x=y+5;

// good
const x = y + 5;
```

<a name="whitespace--newline-at-end"></a><a name="18.5"></a>
### [Newline at end](#whitespace--newline-at-end) 
Kết thúc file với 1 ký tự newline. eslint: [`eol-last`](https://github.com/eslint/eslint/blob/master/docs/rules/eol-last.md)

```javascript
// bad
import { es6 } from './AirbnbStyleGuide';
  // ...
export default es6;
```

```javascript
// bad
import { es6 } from './AirbnbStyleGuide';
  // ...
export default es6;↵
↵
```

```javascript
// good
import { es6 } from './AirbnbStyleGuide';
  // ...
export default es6;↵
```

<a name="whitespace--chains"></a><a name="18.6"></a>
### [Chains](#whitespace--chains) 
Sử dụng thụt lề khi chuỗi các phương thức dài (nhiều hơn 2 chuỗi phương thức). Sử dụng dấu chấm `.` để bắt đầu nhấn mạnh dòng có gọi các phương thức, chứ không phải là lệnh mới. eslint: [`newline-per-chained-call`](https://eslint.org/docs/rules/newline-per-chained-call) [`no-whitespace-before-property`](https://eslint.org/docs/rules/no-whitespace-before-property)

```javascript
// bad
$('#items').find('.selected').highlight().end().find('.open').updateCount();

// bad
$('#items').
  find('.selected').
    highlight().
    end().
  find('.open').
    updateCount();

// good
$('#items')
  .find('.selected')
    .highlight()
    .end()
  .find('.open')
    .updateCount();

// bad
const leds = stage.selectAll('.led').data(data).enter().append('svg:svg').classed('led', true)
    .attr('width', (radius + margin) * 2).append('svg:g')
    .attr('transform', `translate(${radius + margin},${radius + margin})`)
    .call(tron.led);

// good
const leds = stage.selectAll('.led')
    .data(data)
  .enter().append('svg:svg')
    .classed('led', true)
    .attr('width', (radius + margin) * 2)
  .append('svg:g')
    .attr('transform', `translate(${radius + margin},${radius + margin})`)
    .call(tron.led);

// good
const leds = stage.selectAll('.led').data(data);
```

<a name="whitespace--after-blocks"></a><a name="18.7"></a>
### [After blocks](#whitespace--after-blocks) 
Để 1 dòng trống sau khối vè trước 1 lệnh kế tiếp.

```javascript
// bad
if (foo) {
  return bar;
}
return baz;

// good
if (foo) {
  return bar;
}

return baz;

// bad
const obj = {
  foo() {
  },
  bar() {
  },
};
return obj;

// good
const obj = {
  foo() {
  },

  bar() {
  },
};

return obj;

// bad
const arr = [
  function foo() {
  },
  function bar() {
  },
];
return arr;

// good
const arr = [
  function foo() {
  },

  function bar() {
  },
];

return arr;
```

<a name="whitespace--padded-blocks"></a><a name="18.8"></a>
### [Padded blocks](#whitespace--padded-blocks) 
Không nhồi thêm dòng trắng vào khối. eslint: [`padded-blocks`](https://eslint.org/docs/rules/padded-blocks.html)

```javascript
// bad
function bar() {

  console.log(foo);

}

// bad
if (baz) {

  console.log(qux);
} else {
  console.log(foo);

}

// bad
class Foo {

  constructor(bar) {
    this.bar = bar;
  }
}

// good
function bar() {
  console.log(foo);
}

// good
if (baz) {
  console.log(qux);
} else {
  console.log(foo);
}
```

<a name="whitespace--no-multiple-blanks"></a>
### [No multiple blanks](#whitespace--no-multiple-blanks) 
Không nhồi nhiều dòng trắng vào giữa các code. eslint: [`no-multiple-empty-lines`](https://eslint.org/docs/rules/no-multiple-empty-lines)

<!-- markdownlint-disable MD012 -->
```javascript
// bad
class Person {
  constructor(fullName, email, birthday) {
    this.fullName = fullName;


    this.email = email;


    this.setAge(birthday);
  }


  setAge(birthday) {
    const today = new Date();


    const age = this.getAge(today, birthday);


    this.age = age;
  }


  getAge(today, birthday) {
    // ..
  }
}

// good
class Person {
  constructor(fullName, email, birthday) {
    this.fullName = fullName;
    this.email = email;
    this.setAge(birthday);
  }

  setAge(birthday) {
    const today = new Date();
    const age = getAge(today, birthday);
    this.age = age;
  }

  getAge(today, birthday) {
    // ..
  }
}
```

<a name="whitespace--in-parens"></a><a name="18.9"></a>
### [In parens](#whitespace--in-parens) 
Không thêm khoảng trắng bên trong dấu ngoặc đơn. eslint: [`space-in-parens`](https://eslint.org/docs/rules/space-in-parens.html)

```javascript
// bad
function bar( foo ) {
  return foo;
}

// good
function bar(foo) {
  return foo;
}

// bad
if ( foo ) {
  console.log(foo);
}

// good
if (foo) {
  console.log(foo);
}
```

<a name="whitespace--in-brackets"></a><a name="18.10"></a>
### [In brackets](#whitespace--in-brackets) 
Không thêm khoảng trắng bên trong dấu ngoặc vuông. eslint: [`array-bracket-spacing`](https://eslint.org/docs/rules/array-bracket-spacing.html)

```javascript
// bad
const foo = [ 1, 2, 3 ];
console.log(foo[ 0 ]);

// good
const foo = [1, 2, 3];
console.log(foo[0]);
```

<a name="whitespace--in-braces"></a><a name="18.11"></a>
### [In braces](#whitespace--in-braces) 
Thêm khoảng trắng vào trong dấu ngoặc nhọn. eslint: [`object-curly-spacing`](https://eslint.org/docs/rules/object-curly-spacing.html)

```javascript
// bad
const foo = {clark: 'kent'};

// good
const foo = { clark: 'kent' };
```

<a name="whitespace--max-len"></a><a name="18.12"></a>
### [Max len](#whitespace--max-len) 
Dòng code không quá 100 ký tự (kể cả ký tự trắng). Chú ý: đối với [chuỗi dài](#strings--line-length), chuỗi dài thì sẽ không áp dụng với rule này, và không được xuống dòng. eslint: [`max-len`](https://eslint.org/docs/rules/max-len.html)

> Tại sao ư? Nó dễ đọc và dễ maintain.

```javascript
// bad
const foo = jsonData && jsonData.foo && jsonData.foo.bar && jsonData.foo.bar.baz && jsonData.foo.bar.baz.quux && jsonData.foo.bar.baz.quux.xyzzy;

// bad
$.ajax({ method: 'POST', url: 'https://airbnb.com/', data: { name: 'John' } }).done(() => console.log('Congratulations!')).fail(() => console.log('You have failed this city.'));

// good
const foo = jsonData
  && jsonData.foo
  && jsonData.foo.bar
  && jsonData.foo.bar.baz
  && jsonData.foo.bar.baz.quux
  && jsonData.foo.bar.baz.quux.xyzzy;

// good
$.ajax({
  method: 'POST',
  url: 'https://airbnb.com/',
  data: { name: 'John' },
})
  .done(() => console.log('Congratulations!'))
  .fail(() => console.log('You have failed this city.'));
```

<a name="whitespace--block-spacing"></a>
### [Block spacing](#whitespace--block-spacing) 
Nếu như cùng 1 line thì khuyến khích thêm khoảng trắng khi đóng và mở dấu ngoặc nhọn. eslint: [`block-spacing`](https://eslint.org/docs/rules/block-spacing)

```javascript
// bad
function foo() {return true;}
if (foo) { bar = 0;}

// good
function foo() { return true; }
if (foo) { bar = 0; }
```

<a name="whitespace--comma-spacing"></a>
### [Comma spacing](#whitespace--comma-spacing) 
Không thêm khoảng trắng trước dấu phẩy, bắt buộc thêm vào sau dấu phẩy. eslint: [`comma-spacing`](https://eslint.org/docs/rules/comma-spacing)

```javascript
// bad
var foo = 1,bar = 2;
var arr = [1 , 2];

// good
var foo = 1, bar = 2;
var arr = [1, 2];
```

<a name="whitespace--computed-property-spacing"></a>
### [Computed property spacing](#whitespace--computed-property-spacing) 
Bắt buộc có khoảng trắng vào các thuộc tính tính toán trong dấu ngoặc. eslint: [`computed-property-spacing`](https://eslint.org/docs/rules/computed-property-spacing)

```javascript
// bad
obj[foo ]
obj[ 'foo']
var x = {[ b ]: a}
obj[foo[ bar ]]

// good
obj[foo]
obj['foo']
var x = { [b]: a }
obj[foo[bar]]
```

<a name="whitespace--func-call-spacing"></a>
### [Func call spacing](#whitespace--func-call-spacing) 
Không thêm khoảng trắng vào giữa hàm và gọi hàm. eslint: [`func-call-spacing`](https://eslint.org/docs/rules/func-call-spacing)

```javascript
// bad
func ();

func
();

// good
func();
```

<a name="whitespace--key-spacing"></a>
### [Key spacing](#whitespace--key-spacing) 
Bắt buộc có khoảng trắng giữa key và value trong các thuộc tính của 1 đối tượng literal. eslint: [`key-spacing`](https://eslint.org/docs/rules/key-spacing)

```javascript
// bad
var obj = { "foo" : 42 };
var obj2 = { "foo":42 };

// good
var obj = { "foo": 42 };
```

<a name="whitespace--no-trailing-spaces"></a>
### [No trailing spaces](#whitespace--no-trailing-spaces) 
Bỏ khoảng trắng ở cuối dòng. eslint: [`no-trailing-spaces`](https://eslint.org/docs/rules/no-trailing-spaces)

<a name="whitespace--no-multiple-empty-lines"></a>
### [No multiple empty lines](#whitespace--no-multiple-empty-lines) 
Tránh nhiều dòng trắng và chỉ cho phép 1 dòng mới ở cuối file. eslint: [`no-multiple-empty-lines`](https://eslint.org/docs/rules/no-multiple-empty-lines)

<!-- markdownlint-disable MD012 -->
```javascript
// bad
var x = 1;



var y = 2;

// good
var x = 1;

var y = 2;
```
<!-- markdownlint-enable MD012 -->