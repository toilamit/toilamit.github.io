How To Change MySQL Storage Engine

Trong bài viết này sẽ hướng dẫn cách kiểm tra storage engine của bảng và cách thay đổi giữa các loại storage engine với nhau.

MySQL hỗ trợ nhiều loại storage engine với đặc tính và khối lượng lưu trữ khác nhau. Ví dụ với InnoDB thì hỗ trợ transaction trong khi MyISAM thì không hỗ trợ.

## Truy vấn storage engine mà table đang dùng
Có một vài cách để lấy thông tin về storage engine của bảng.

Cách 1: lấy thông tin từ bảng `tables` trong database `information_schema`

Ví dụ, với bảng `offices` trong [dữ liệu mẫu](/2019/05/23/download-mysql-sample-database/) `classicmodels`

```sql
SELECT 
    engine
FROM
    information_schema.tables
WHERE
    table_schema = 'classicmodels'
        AND table_name = 'offices';
```
![MySQL Change Storage Engine Example](/wp-content/uploads/2019/07/MySQL-Change-Storage-Engine-Example.jpg)

Cách 2: sử dụng lệnh `SHOW TABLE STATUS`

```sql
SHOW TABLE STATUS LIKE 'offices';
```
![MySQL Show Table Status Example](/wp-content/uploads/2019/07/MySQL-Show-Table-Status-Example.jpg)

Cách 3: sử dụng lệnh `SHOW CREATE TABLE`

```sql
SHOW CREATE TABLE offices;
```

Ví dụ:

```sql
mysql> SHOW CREATE TABLE offices\G;
*************************** 1. row ***************************
       Table: offices
Create Table: CREATE TABLE `offices` (
  `officeCode` varchar(10) NOT NULL,
  `city` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `addressLine1` varchar(50) NOT NULL,
  `addressLine2` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `country` varchar(50) NOT NULL,
  `postalCode` varchar(15) NOT NULL,
  `territory` varchar(10) NOT NULL,
  PRIMARY KEY (`officeCode`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1
1 row in set (0.00 sec)
mysql>
```
Kết quả cho thấy bảng `offices` đang dùng InnoDB storage engine.

## Thay đổi storage engine
Chúng ta có thể sử dụng lệnh `ALTER TABLE` để thay đổi storage engine của bảng.

```sql
ALTER TABLE table_name ENGINE engine_name;
```
Để kiểm tra các loại storage engine mà MySQL server có hỗ trợ, bạn có thể sử dụng lệnh: `SHOW ENGINES`

```sql
SHOW ENGINES;
```
![MySQL SHOW ENGINE](/wp-content/uploads/2019/07/MySQL-SHOW-ENGINE.jpg)

Ví dụ, thay đổi storage engine của bảng `offices` từ InnoDB sang MyISAM:

```sql
ALTER TABLE offices ENGINE = 'MYISAM';
```
