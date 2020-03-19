9 Ways to Remove Elements From A JavaScript Array - Plus How to Safely Clear JavaScript Arrays

Javascript là một ngôn ngữ hay. Mảng trong Javascript cũng kì diệu. Đôi lần làm việc với mảng mà choáng váng đầu khi không thể tìm thấy một method kiểu như Array.remove hay Array.delete gì cả.

Cũng chẳng sao, vì nếu không có các method sẵn có thì mình có thể tự viết method thôi. 

Xóa phần tử ở cuối thì đã có `pop()`, xóa phần tử đầu thì đã có `shift()` hoặc xóa phần tử ở giữa thì đã có `splice`. Còn muốn mảng mới với các phần tử được lọc thì nâng cao hơn là `filter()`.

- pop - xóa phần tử cuối mảng
- shift - xóa phần tử đầu mảng
- splice - xóa phần tử ở vị trí xác định của mảng
- filter - tùy chỉnh xóa các phẩn tử trong mảng

Nào, cùng lướt qua vài cách để xóa phần tử khỏi mảng nhé:

## Xóa phần tử cuối mảng
Có thể sử dụng thuộc tính `length` của mảng để xóa các phần tử cuối mảng. Các phần tử có index lớn hơn hoặc bằng với giá trị new length thì sẽ bị xóa bỏ.

```javascript
var ar = [1, 2, 3, 4, 5, 6];
ar.length = 4; // set length to remove elements
console.log( ar ); //  [1, 2, 3, 4]
```
Hàm `pop()` sẽ xóa phần tử cuối của mảng, trả lại giá trị phần tử đó và cập nhật lại độ dài của mảng.

```javascript
var ar = [1, 2, 3, 4, 5, 6];
ar.pop(); // returns 6
console.log( ar ); // [1, 2, 3, 4, 5]
```

## Xóa phần tử đầu mảng
Hàm `shift()` khá giống với hàm pop. Chỉ khác là nó xóa phần tử đầu mảng mà thôi.

```javascript
var ar = ['zero', 'one', 'two', 'three'];
ar.shift(); // returns "zero"
console.log( ar ); // ["one", "two", "three"]
```
Hàm shift sẽ trả về giá trị của phần tử đã xóa, cập nhật lại index của các phần tử còn lại trong mảng, và cập nhật lại độ dài mảng.

Nếu mà không có phần tử nào hoặc mảng có độ dài là 0 thì trả về undefined.

## Sử dụng Splice để xóa phần tử trong mảng
Hàm splice có thể thêm hoặc xóa phần tử trong một mảng. Với tham số thứ nhất là vị trí bắt đầu thêm hoặc xóa, tham số thứ 2 là số lượng phần tử xóa. Tham số thứ 3 tùy chọn; có thể chỉ ra phaafnf tử được thêm vào. 

Trong mảng thì vị trí đầu tiên là 0.

```javascript
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
var removed = arr.splice(2,2);

/*
removed === [3, 4]
arr === [1, 2, 5, 6, 7, 8, 9, 0]
*/
```

Hàm splice cũng dùng để xóa 1 dải các phần tử từ mảng.

```javascript
["bar", "baz", "foo", "qux"]

list.splice(0, 2) 
// Starting at index position 0, remove two elements ["bar", "baz"] and retains ["foo", "qux"].
```
## Xóa phần tử trong mảng bằng giá trị sử dụng splice

```javascript
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

for( var i = 0; i < arr.length; i++){ 
   if ( arr[i] === 5) {
     arr.splice(i, 1); 
   }
}

//=> [1, 2, 3, 4, 6, 7, 8, 9, 0]
```
Đây là 1 ví dụ đơn giản với các phần tử là kiểu integer. Trường hợp các phần tử là các objects thì sẽ phức tạp hơn 1 chút.

Đoạn code trên chỉ remove đi 1 phần tử, nếu muốn xóa nhiều phần tử thì có vẻ không ổn với đoạn code trên.

Vì phần tử được xóa khỏi mảng mà giá trị index vẫn tăng và ở phần tử kế tiếp sau giá trị được match sẽ bị bỏ qua.

Để giải quyết vấn đề này thì có thể sử dụng đoạn code bên dưới. Việc giảm đi giá trị index thì nó sẽ không bỏ qua phần tử tiếp theo trong mảng.

```javascript
var arr = [1, 2, 3, 4, 5, 5, 6, 7, 8, 5, 9, 0];

for( var i = 0; i < arr.length; i++){ 
   if ( arr[i] === 5) {
     arr.splice(i, 1); 
     i--; // thêm đoạn này để không bị bỏ qua phần tử kế tiếp khi mà i++
   }
}

//=> [1, 2, 3, 4, 6, 7, 8, 9, 0]
```

## Sử dụng hàm filter để xóa phần tử bằng giá trị
Không giống như phương thức splice, filter tạo ra 1 mảng mới. Hàm filter() không thay đổi mảng khi được gọi mà trả về 1 mảng mới.

filter() có 1 tham số và một callback. Callback được gọi như là 1 hàm filter và lặp qua từng phần tử. Hàm callback có 3 phần tử: giá trị hoặc phần tử hiện tại, index của phần tử hiện tại, mảng hiện tại.

Callback sẽ trả về true hoặc false, nếu là true thì phần tử hiện tại sẽ được thêm vào mảng mới (filtered array)

```javascript
var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

var filtered = array.filter(function(value, index, arr){

    return value > 5;

});

//filtered => [6, 7, 8, 9]
//array => [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
```
Khuyên bạn là nên gán các mảng đã được filter vào 1 mảng mới. Vì nó hữu ích trong trường hợp bạn muốn sử dụng lại cả dữ liệu của mảng gốc. Okay boy! :D

## Sử dụng thư viện Lodash để xóa phần tử
Nếu bạn ngại phải custom một method cho chức năng xóa phần tử trong mảng thì có thể dùng hàm `remove` trong thư viện Lodash.

Hàm `remove` trong Lodash làm việc giống như hàm filter nhưng được sắp xếp ngược lại. Nó không giữ giá trị của mảng ban đầu, xóa các phần tử được match. Nó trả về các phần tử được match như 1 new aray.

```javascript
var array = [1, 2, 3, 4];
var evens = _.remove(array, function(n) {
  return n % 2 === 0;
});

console.log(array);
// => [1, 3]

console.log(evens);
// => [2, 4]
```

## Tạo một hàm remove

```javascript
function arrayRemove(arr, value) {

   return arr.filter(function(ele){
       return ele != value;
   });

}

var result = arrayRemove(array, 6);

// result = [1, 2, 3, 4, 5, 7, 8, 9, 0]
```
Hàm này rất cơ bản, và giả sử là chỉ sử dụng với giá trị kiểu numbers hoặc strings. Nếu giá trị là các kiểu phức tạp hơn thì bạn nên customer lại cho phù hợp.
## Sử dụng toán tử delete để xóa hoàn toàn phần tử trong mảng

```javascript
var ar = [1, 2, 3, 4, 5, 6];
delete ar[4]; // delete element with index 4
console.log( ar ); // [1, 2, 3, 4, undefined, 6]
alert( ar ); // 1,2,3,4,,6
```
Toán tử `delete` không ảnh hưởng tới length, cũng không ảnh hưởng tới indexs của các phần tử kế tiếp. Thực tế phần tử bị delete sẽ có giá trị là undefined.

Toán tử delete được thiết kế để xóa các thuộc tính của objects mà array lại là objects

Lý do phần tử không thực sự bị xóa khỏi mảng là do toán tử delete liên quan tới việc giải phóng bộ nhớ hơn là xóa phần tử. Bộ nhớ được giải phóng khi không còn tham chiếu tới giá trị.

## Clear hoặc Reset mảng

Đây là cách đơn giản mà ai cũng làm

```javascript
var ar = [1, 2, 3, 4, 5, 6];

//do stuff

ar = [];

//a new, empty array!
```
Nhưng sử dụng cách trên sẽ có 1 vấn đề là nếu bạn gán mảng vào 1 biến khác. Thì các tham chiếu đó sẽ không thay đổi mà vẫn giữ các giá trị của mảng ban đầu. Nó có thể tạo ra bug🐛 tiềm ẩn trong chương trình.

Ví dụ đơn giản về điều này:

```javascript
var arr1 = [1, 2, 3, 4, 5, 6];

var arr2 = arr1;  // Reference arr1 by another variable 

arr1 = [];

console.log(arr2); // Output [1, 2, 3, 4, 5, 6]
```
Cách khác đơn giản là thiết lập length của mảng về 0

```javascript
var ar = [1, 2, 3, 4, 5, 6];

console.log(ar); // Output [1, 2, 3, 4, 5, 6]

ar.length = 0;

console.log(ar); // Output []
```
Cách khác là kết hợp phương thức splice và thuộc tính length của mảng làm tham số thứ 2. Kết quả trả về 1 bản sao khác của mảng ban đầu.

```javascript
var ar = [1, 2, 3, 4, 5, 6];

console.log(ar); // Output [1, 2, 3, 4, 5, 6]

ar.splice(0, ar.length);

console.log(ar); // Output []
```

2 cách trên sẽ không tạo ra 1 mảng mới mà thay đổi các phần tử của mảng. Có nghĩa là mọi tham chiếu đều được update.

Còn có thêm cách khác nữa là sử dụng vòng lặp while, hơi lạ phải không, nhưng thú vị đấy và có thể gây ấn tượng cho 1 số bạn bè đấy :D.

```javascript
var ar = [1, 2, 3, 4, 5, 6];

console.log(ar); // Output [1, 2, 3, 4, 5, 6]

  while (ar.length) {
    ar.pop();
  }

console.log(ar); // Output []
```

Đây là 1 trong vô vàn các cách làm để xóa phần tử ra khỏi mảng trong Javascript. Tuy nhiên xét về performance thì các cách trên đây là tốt, nhanh và rất dễ đọc.

Túm cái váy lại là mặc dù Javascript không hề có phương thức `remove` nào cho mảng. Nhưng với các phương thức khác thì chúng ta vẫn có thể tạo ra được 1 phương thức remove tùy ý.

Vì mảng là rất quan trọng trong việc quản lý dữ liệu, nên hãy thực sự làm việc tốt với mảng nhé! :D
