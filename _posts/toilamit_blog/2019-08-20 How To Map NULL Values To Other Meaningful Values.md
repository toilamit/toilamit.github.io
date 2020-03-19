How To Map NULL Values To Other Meaningful Values

Bài viết này sẽ hướng dẫn bạn cách map giá trị `NULL` vào giá trị có ý nghĩa khác thay vì chỉ hiển thị là NULL.

[Dr.E.F.Codd](http://en.wikipedia.org/wiki/Edgar_F._Codd), là người tạo ra mô hình quan hệ trong database và giới thiệu khái niệm `NULL` có nghĩa là giá tị unknown hoặc không có thông tin.

MySQL cũng hỗ trợ NULL với ý nghĩa là thiếu thông tin hoặc thông tin không khả dụng.

Trong bảng dữ liệu, nếu như lưu giá trị NULL và khi truy vấn để hiển thị ra màn hình hoặc bất kỳ báo cáo thì giá trị đó sẽ không hiển thị gì lên.

Để tăng tính đọc được và hiểu được thì bạn phải hiển thị giá trị NULL bằng một giá trị unknown, missing hoặc không khả dụng (N/A). Để làm điều này thì bạn có thể sử dụng hàm `IF`.

```sql
IF(exp,exp_result1,exp_result2);
```
Nếu như mà `exp` là `TRUE` (exp <> 0 và exp <> NULL ), thì hàm `IF` sẽ trả về giá trị của `exp_result1` nếu không thì trả về giá trị của`exp_result2`.

Giá trị trả về phụ thuộc vào biểu thức `exp_result1` và `exp_result2` và có thể là string hoặc number.

Để hiểu hơn thì chúng ta sẽ làm một số ví dụ.

Chúng ta sẽ sử dụng bảng `customers` trong [database mẫu](/2019/05/23/download-mysql-sample-database/)

Lấy một số thông tin trong bảng `customers`:

```sql
SELECT 
    customername, state, country
FROM
    customers
ORDER BY country;
```

![MySQL NULL values example](/wp-content/uploads/2019/08/MySQL-NULL-values-example.jpg)

Ở kết quả truy vấn trên thì một số giá trị của cột `state` không có. Chúng ta sẽ sử dụng hàm `IF` để hiển thị giá trị `N/A` thay vì NULL:

```sql
SELECT 
    customername, IF(state IS NULL, 'N/A', state) state, country
FROM
    customers
ORDER BY country;
```

![MySQL NULL as NA value](/wp-content/uploads/2019/08/MySQL-NULL-as-NA-value.jpg)

Ngoài hàm `IF`, chúng ta có thể sử dụng hàm `IFNULL` để xử lý trực tiếp giá trị NULL. Cú pháp như sau:

```sql
IFNULL(exp,exp_result);
```
Hàm `IFNULL` sẽ trả về giá trị biểu thức `exp_result` nếu `exp` là NULL nếu không thì trả về giá trị của `exp`.

Xem ví dụ dưới đây:

```sql
SELECT customername, 
       IFNULL(state,'N/A') state, 
       country
FROM customers
ORDER BY country;
```

![MySQL NULL with IFNULL function](/wp-content/uploads/2019/08/MySQL-NULL-with-IFNULL-function.jpg)

Vậy là với 2 hàm `IF` và `IFNULL` thì bạn có thể tùy ý hiển thị giá trị thay thế NULL một cách hợp lý. Giúp cho việc đọc dữ liệu dễ hơn và hiểu hơn.
