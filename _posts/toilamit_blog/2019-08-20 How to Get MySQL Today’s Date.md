How to Get MySQL Today’s Date

Bài viết này sẽ hướng dẫn cách truy vấn dữ liệu khớp với ngày hiện tại sử dụng các hàm về ngày tháng có sẵn trong MySQL.

## Lấy dữ liệu của ngày hiện tại
Trong một số trường hợp, bạn có thể muốn lấy dữ liệu từ một bảng với cột ngày tháng là hôm nay, ví dụ:

```sql
SELECT 
    column_list
FROM
    table_name
WHERE
    expired_date = today;
```
Để lấy ngày tháng hôm nay, chúng ta sử dụng hàm `CURDATE()` như sau:

```sql
mysql> SELECT CURDATE() today;
+------------+
| today      |
+------------+
| 2019-08-20 |
+------------+
1 row in set (0.00 sec)
```
Hoặc bằng cách lấy ngày tháng từ thời gian hiện tại:

```sql
mysql> SELECT DATE(NOW()) today;
+------------+
| today      |
+------------+
| 2019-08-20 |
+------------+
1 row in set (0.00 sec)
```
Do đó mà truy vấn ta sử dụng sẽ là:

```sql
SELECT 
    column_list
FROM
    table_name
WHERE
    expired_date = CURDATE();
```
Nếu cột `expired_date` có cả ngày và giờ thì ta sẽ dùng hàm `DATE()` để chỉ lấy thành phần ngày và so sánh với ngày hiện tại:

```sql
SELECT 
    column_list
FROM
    table_name
WHERE
    DATE(expired_date) = CURDATE();
```

## Viết hàm trả về ngày hiện tại
Nếu bạn không muốn dùng nhiều lần hàm `CURDATE()` thì bạn có thể viết hàm riêng `today()` để cho truy vấn dễ đọc hơn, cách viết như sau:

```sql
DELIMITER $$
CREATE FUNCTION today()
RETURNS DATE
BEGIN
RETURN CURDATE();
END$$
DELIMITER ;
```
Sau đó bạn có thể sử dụng hàm `today()`:

```sql
mysql> SELECT today();
+------------+
| today()    |
+------------+
| 2019-08-20 |
+------------+
1 row in set (0.00 sec)
```
Lấy ngày mai:

```sql
mysql> SELECT today() + interval 1 day Tomorrow;
+------------+
| Tomorrow   |
+------------+
| 2019-08-21 |
+------------+
1 row in set (0.00 sec)
```
Lấy ngày hôm qua:

```sql
mysql> SELECT today() - interval 1 day Yesterday;
+------------+
| Yesterday  |
+------------+
| 2019-08-19 |
+------------+
1 row in set (0.00 sec)
```
