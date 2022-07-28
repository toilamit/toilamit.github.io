---
layout: post
title: array.flatMap() liệu có làm dev nhàn hơn?
categories: [Javascript]
date: 2022-07-28 16:42:00 +0700
description: Sử dụng array.flatMap() cho phép bạn map các mảng một cách thông minh hơn.
img: 
fig-caption: # Add figcaption (optional)
tags: [js, javascript, array map, map array, flatmap]
---

`array.map()` là một hàm mapper rất hữu ích: nó nhận 1 mảng, và 1 hàm mapper sau đó trả về 1 mảng mới được mapped.

Tuy nhiên, sẽ có 1 sự thay thế cho `array.map()` đó là `array.flatMap()` (có từ ES2019). Phương thức này giúp bạn thực hiện map. Nhưng cũng có thể xóa hoặc thập chí thêm mới phần tử vào mảng được trả về.

## 1. Mapper một cách thông minh hơn

Với 1 mảng các phần tử số, làm cách nào để tạo ra 1 mảng mới với giá trị gấp đôi?
Having an array of numbers, how would you create a new array with the items doubled?

Sử dụng hàm `array.map()` là 1 giải pháp tốt:
Using the array.map() function is a good approach:

```js
const numbers = [0, 3, 6];
const doubled = numbers.map(n => n * 2);
console.log(doubled); // logs [0, 6, 12]
```

`numbers.map(number => 2 * number)` tạo ra mảng mới với mỗi phần tử số được gấp đôi lên.

Với các trường hợp khi bạn cần map 1 - 1, nghĩa là các mảng mới sẽ có cùng số lượng phần tử với mảng gốc thì `array.map()` làm rất tốt.

Nhưng nếu bạn muốn gấp đôi các số của mảng và loại bỏ giá trị 0 thì phải làm sao?

Sử dụng `array.map()` trực tiếp sẽ không thể được bởi vì nó luôn tạo ra 1 mảng mới với cùng số lượng phần tử như mảng gốc. Nhưng bạn có thể kết hợp `array.map()` và `array.filter()`

```js
const numbers = [0, 3, 6];
const doubled = numbers
  .filter(n => n !== 0)
  .map(n => n * 2);
console.log(doubled); // logs [6, 12]
```

Mảng `doubled` bây giờ chứa các phần tử số đã được gấp đôi lên và không bao gồm giá trị 0.

Tốt, việc kết hợp cả `array.map()` và `array.filter()` sẽ cho kết quả như mong đợi. Nhưng liệu có giải pháp nào ngắn gọn hơn không?

Dĩ nhiên là có, với `array.flatMap()` thì bạn hoàn toàn có thể làm được với điều tương tự.

Bạn có thể xem ví dụ bên dưới - trả về mảng mới, nhân đôi các phần tử và loại bỏ giá trị 0:

```js
const numbers = [0, 3, 6];
const doubled = numbers.flatMap(number => {
  return number === 0 ? [] : [2 * number];
});
console.log(doubled); // logs [6, 12]
```

Chỉ cần sử dụng `numbers.flatMap()` thì bạn có thể tạo ra 1 mảng mới, đồng thời bỏ qua các phần tử cụ thể không mong muốn.

Vậy `array.flatMap()` hoạt động như thế nào?

## 2. _array.flatMap()_

`array.flatMap()` nhận hàm callback như 1 tham số đầu vào và trả về 1 mảng mới đã được map.

```js
const mappedArray = array.flatMap((item, index, origArray) => {
  // ...
  return [value1, value2, ..., valueN];
}[, thisArg]);
```

Hàm callback được gọi mỗi lần trong mảng gốc với 3 đối số: phần tử hiện tại, index và mảng gốc. Mảng được trả về bởi callback sau đó được làm phẳng với độ sâu 1 cấp và các phần tử trả về được thêm vào mảng mới.

Ngoài ra, phương thức cho phép sử dụng đối số thứ 2, tùy ý, là đối số chỉ ra các giá trị bên trong của callback.

Cách đơn giản nhất là dùng `array.flatMap()` để làm phẳng 1 mảng mà các phần tử lại là mảng (mảng của các mảng):

```js
const arrays = [[2, 4], [6]];
const flatten = arrays.flatMap(item => item);
console.log(flatten); // logs [2, 4, 6]
```

Trong ví dụ trên thì `arrays` là mảng của các mảng số: `[[2, 4], [6]]`. Việc gọi lệnh `arrays.flatMap(item => item)` sẽ làm phẳng mảng thành `[2, 4, 6]`.

Nhưng `array.flatMap()` có thể làm nhiều hơn thế. Bằng cách kiểm soát số mảng trả về từ callback, ta có thể:

- _xóa bỏ_ các phần tử từ mảng trả về bằng việc return 1 mảng rỗng `[]`.
- _sửa đổi_ các phần tử đã được mapped bằng một mảng với 1 giá trị mới khác `[newValue]`.
- hoặc _thêm mới_ các phần tử bằng cách trả về 1 mảng với nhiều giá trị: `[newValue1, newValue2, ...]`.

Ví dụ, như ở phần trước trước, bạn có thể tạo mới 1 mảng bằng việc nhân đôi phần từ, nhưng đồng thời cũng loại bỏ các phần tử `0`.

```js
const numbers = [0, 3, 6];
const doubled = numbers.flatMap(number => {
  return number === 0 ? [] : [2 * number];
});
console.log(doubled); // logs [6, 12]
```

Giải thích 1 chút ví dụ trên:

Hàm callback trả về 1 mảng rỗng `[]` nếu như phần tử hiện tại là `0`. Có nghĩa là khi được làm phẳng thì mảng rỗng `[]` không cung cấp giá trị nào cả.

Nếu như các phần tử lặp hiện tại không phải là 0 thì `[2 * number]` sẽ được trả về. Khi mảng `[2 * number]` được làm phẳng thì chỉ có `2 * number` là được thêm vào trong mảng trả về.

Bạn cũng có thể dùng `array.flatMap()` để tăng số phần tử trong mảng đã mapped.

Ví dụ, đoạn code sau map 1 mảng các số vào 1 mảng mới bằng việc gấp đôi hoặc gấp 3 lần các số:

```js
const numbers = [1, 4];
const trippled = numbers.flatMap(number => {
  return [number, 2 * number, 3 * number];
});
console.log(trippled);
// logs [1, 2, 3, 4, 8, 12]
```

## 3. Kết luận

`array.flatMap()` là 1 cách để nếu bạn muốn map 1 mảng sang mảng mới, nhưng cũng có quyền kiểm soát số lượng phần tử mà bạn muốn thêm vào trong mảng mới.

Hàm callback của `array.flatMap(callback)` được gọi với 3 đối số: phần tử lặp hiện tại, index và mảng gốc. Mảng được trả về từ hàm callback sau đó được làm phẳng với độ sâu 1 cấp, và các phần tử trả về được chèn vào mảng được mapped.

Chú ý là nếu bạn chỉ muốn map 1 phần tử đơn lẻ với 1 giá trị mới thì nên sử dụng `array.map()`.

Thử thách nhỏ: viết hàm `filter(array, predicateFunc)` để trả về 1 mảng đã được filter bởi `predicateFunc`. Yêu cầu sử dụng `array.flatMap()`.

## Tham khảo

- https://dmitripavlutin.com/javascript-array-flatmap/