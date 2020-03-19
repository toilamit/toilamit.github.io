MySQL ROW_NUMBER, This is How You Emulate It

Trong bài viết này sẽ hướng dẫn các bạn cách mô phỏng hàm `row_number()` trong MySQL để thêm giá trị số duy nhất cho mỗi row hoặc mỗi group của tập kết quả trả về.

> Chú là hàm `ROW_NUMBER()` chỉ chạy trên MySQL 8.0

## Giới thiệu hàm row_number
`row_number()` là một hàm thứ bậc, nó trả về các số liên tiếp của hàng, bắt đầu từ 1 cho hàng đầu tiên. Thông thường sử dụng hàm `row_number()` để xuất ra các báo cáo rõ ràng.

Đối với MySQL version thấp hơn 8.0 sẽ không được hỗ trợ hàm `row_number()` như Microsoft SQL Server, Oracle, hoặc PostgreSQL. May mắn là MySQL cung cấp các biết session và do đó chúng ta có thể mô phỏng lại hàm `row_number()`

## Thêm row number cho mỗi dòng
Để có thể sử dụng `row_number()` thì chúng ta phải sử dụng các biến session trong truy vấn.

Câu lệnh dưới đây sẽ lấy ra 5 nhân viên từ bảng `employees` và thêm vào số dòng cho mỗi dòng, bắt đầu từ số 1.

```sql
SET @row_number = 0;
 
SELECT 
    (@row_number:=@row_number + 1) AS num, firstName, lastName
FROM
    employees
LIMIT 5;
```
![mysql row_number session variables](/wp-content/uploads/2019/08/mysql-row_number-session-variables.jpg)

Các câu lệnh ở trên:

- Trong câu lệnh đầu tiên, chúng ta định nghĩa 1 biến `row_number` và gán giá trị là 0. `row_number` là một biến session được chỉ ra bới tiền tố `@`.
- Trong câu lệnh thứ 2, chúng ta select dữ liệu từ bảng `employees` và tăng giá trị `row_number` lên 1 cho mỗi row. `LIMIT` sẽ giới hạn kết quả trả về là 5.

Có 1 kỹ thuật khác là sử dụng session variable như là 1 derived table và cross join nó với bảng chính. Hãy xem truy vấn sau: 

```sql
SELECT 
    (@row_number:=@row_number + 1) AS num, firstName, lastName
FROM
    employees,(SELECT @row_number:=0) AS t
LIMIT 5;
```
Chú ý là derived table bắt buộc có alias cho chính nó để đảm bảo truy vấn đúng cú pháp

## Thêm row number cho mỗi group
Chức năng `row_number() OVER PARTITION BY` thì thế nào nhỉ? Ví dụ, khi bạn muốn thêm row number cho mỗi group và nó sẽ được đặt lại cho mỗi nhóm mới.

Hãy xem bảng `payments` trong [database mẫu](/2019/05/23/download-mysql-sample-database/)

![payments table](/wp-content/uploads/2019/08/payments_table.png)

```sql
SELECT
    customerNumber, paymentDate, amount
FROM
    payments
ORDER BY customerNumber;
```
![mysql row_number payments table](/wp-content/uploads/2019/08/mysql-row_number-payments-table.jpg)

Giả sử đối với mỗi customer, bạn muốn thêm một row number, và mỗi row number sẽ đặt lại bất cứ lúc nào customer number thay đổi.

Để làm điều này thì bạn phải sử dụng biến session, một cho row number và biết khác cho việc lưu customer number cũ để so sánh nó với số hiện tại, giống như trong truy vấn sau:

```sql
SELECT 
    @row_number:=CASE
        WHEN @customer_no = customerNumber THEN @row_number + 1
        ELSE 1
    END AS num,
    @customer_no:=customerNumber as CustomerNumber,
    paymentDate,
    amount
FROM
    payments
ORDER BY customerNumber;
```
Trong truy vấn trên, chúng ta sử dụng lệnh `CASE`. Nếu customer number không đổi, chúng ta tăng biến `row_number`, trái lại thì chúng ta đặt lại nó về 1. 

![mysql row_number per group](/wp-content/uploads/2019/08/mysql-row_number-per-group.jpg)

Bạn có thể sử dụng derived table và kỹ thuật cross join để có kết quả tương tự:

```sql
SELECT 
    @row_number:=CASE
        WHEN @customer_no = customerNumber THEN @row_number + 1
        ELSE 1
    END AS num,
    @customer_no:=customerNumber as CustomerNumber,
    paymentDate,
    amount
FROM
    payments,(SELECT @customer_no:=0,@row_number:=0) as t
ORDER BY customerNumber;
```
