What is the !! (not not) operator in JavaScript?

The other day I was rolling through some JavaScript to figure out how a 3rd party library ticked. As I scanned the lines of code I came across a line like the following:

value = !!value;

Unless you have been using JavaScript for a while this may look like some advanced VooDoo. But it is really a shorthand way to convert any value to a boolean.

The syntax leverages a little sorcery by doubling up the not operator.

So let's dive a little deeper into the JavaScript not logical operator and examine truthfulness in JavaScript.

You see JavaScript has a 'quirk'. It converts values to a string representation or at least something like the string version.

This can lead to all sorts of unexpected results when you try to compare variables, especially when they are essentially different types.

You may hear the terms truthy and falsey, which were coined by Douglas Crockford in his JavaScript the Best Parts book.

This is why I always use strict comparisons which is a tripple equals, '=' and '!'.

And that is where I will start this tutorial.

A Quick Review of JavaScript Truthy & Falsy
First there are two evaluation values associated with any JavaScript variable:

- Truthy is anything that evaliates to to TRUE
- Falsey is anything that evaliates to to FALSE
Simple enough right?

There are 6 things that evaluate to falsey:

```javascript
undefined
null
NaN
0
"" (empty string)
false (duh)
```
Believe it or not the best way to determine if something is truthy is to determine if it is falsey.

Are you following along? Don't worry, it will make sense.

First, all objects are truthy, so you can wrap any value in an object and it will be truthy, even when it is falsey by default.

Toán tử `==` sẽ không so sánh về kiểu của biến vì bản chất là Javascript không ép kiểu và nó có thể che giấu lỗi, điều này sẽ gây ra lỗi ứng dụng trong một số trường hợp (mà ta không biết)

Đó là lý do vì sao các bạn nên sử dụng toán tử `===` hoặc `!==`. Khi ấy Javascript sẽ so sánh cả kiểu và giá trị.

Tất cả điều này là quan trọng khi bạn cần kiểm tra giá trị true của một giá trị nào đó. Ví dụ trong câu lệnh `if`

```javascript
if(0){

	//this will never execute
}
```

## Toán tử not (!)
Quay lại ví dụ trên, để thực hiện code trong lệnh if thì chỉ cần sử dụng toán tử !

```javascript
if(!0){

	//this will execute
}
```

Toán tử ! sẽ đảo ngược trạng thái logic (true hoặc false) của giá trị. Trong trường hợp này nó là giá trị truthy hoặc falsey. Điều này có vẻ kì quoặc nhưng nó có thể là hữu ích.

```javascript
if(!myValue){
	//do something
}
```

Với đoạn mã trên, code sẽ chạy trong câu lệnh if nếu như biến myValue nhận vào là false.

## Sử dụng !! (not not) để tạo ra kiểu boolean
Dấu ! đơn giản chỉ chuyển đổi giá trị truthy hoặc falsey của nó mà bản thân nó đã là kiểu boolean rồi. Còn nếu bạn muốn biểu diễn một giá trị là kiểu boolean thật sự trong biểu thức thì bạn phải chuyển đổi nó sang giá trị boolean thật sự sử dụng !!.

Trên thực tế là bạn chuyển đổi giá trị sang kiểu boolean, chứ không chỉ là giá trị truthy|falsey.

Some say the way to remember this trick is, “bang bang, you’re boolean”.

A little geek play on words.

This is where a double not is your friend. And it also makes you look like a rock start programmer.


```javascript
if(!!0){ // evaluates to false

	//this will not execute

}
```

But that is not much different than the original example. I know, but at the same time, would you ever use a hard coded value as an if conditional?

No, you would use a variable.


```javascript
let v = 0;

v ? true : false  //equals false
!v ? true : false  //equals true
!!v //false

v = 1;

v ? true : false  //equals true
!v ? true : false  //equals false
!!v //true

typeof !!v // boolean
```

Boolean (true, false) là khái niệm rất cơ bản trong Javascript mà bạn cần phải nắm vững. Lệnh `!!` là 1 trick hay để convert bất kì biến nào về giá trị true hoặc false mà bạn có thể sử dụng để kiểm tra dưới dạng biểu thức.

Thêm nữa dùng nó sẽ khiến bạn trông ngầu hơn :D

## Refs
- https://love2dev.com/blog/javascript-not-operator/
