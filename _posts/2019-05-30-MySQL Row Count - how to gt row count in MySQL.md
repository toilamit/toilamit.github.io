---
layout: post
title: MySQL Row Count - How to Get Row Count in MySQL
permalink: # Add permalink ex: /javascript (optional)
date: 2019-05-30 09:00:00 +0700
description: 
img: # Add image post ex: viet-dep-zai.jpg (optional)
fig-caption: # Add figcaption (optional)
tags: [mysql]
---

Bài viết này sẽ hướng dẫn nhiều cách khác nhau để lấy số lượng bản ghi trong database.

### Đếm số bản ghi trong 1 bảng

Trong MySQL để đếm số bản ghi trong 1 bảng ta dùng lệnh:

```sql
SELECT 
    COUNT(*)
FROM
    table_name;
```

Ví dụ, lấy số bản ghi của bảng `customers` trong [sample database](/2019/05/23/download-mysql-sample-database/):

```sql
SELECT 
    COUNT(*)
FROM
    customers;
```

```sql
+----------+
| COUNT(*) |
+----------+
|      122 |
+----------+
1 row in set (0.01 sec)
```

### Đếm số bản ghi của 2 hay nhiều bảng

Trong MySQL để đếm số bản ghi của nhiều bảng, bạn sử dụng toán tử `UNION` để tập hợp các kết quả trả về trong mỗi câu lệnh `SELECT`.

Ví dụ, đếm số bản ghi của bảng `customers` và `orders`:

```sql
SELECT 
    'customers' tablename, 
     COUNT(*) rows
FROM
    customers 
UNION 
SELECT 
    'orders' tablename, 
     COUNT(*) rows
FROM
    orders;
```

```sql
+-----------+------+
| tablename | rows |
+-----------+------+
| customers |  122 |
| orders    |  326 |
+-----------+------+
2 rows in set (0.01 sec)
```

### Đếm số bản ghi của tất cả bảng trong database

Các bước sau sẽ giúp bạn đếm số bản ghi của tất cả bảng trong database `classicmodels`

1. Bước 1: Lấy tên tất cả tên bảng
2. Bước 2: Tạo lệnh SQL bao gồm tất cả lệnh `SELECT COUNT(*) FROM table_name` từ tất cả các bảng đã được phân tách bởi `UNION`
3. Bước 3: Thực thi lệnh

**Bước 1:** lấy tất cả tên bảng, bạn truy vấn từ database `information_schema`:

```sql
SELECT 
    table_name
FROM
    information_schema.tables
WHERE
    table_schema = 'classicmodels'
        AND table_type = 'BASE TABLE';
```

```sql
+--------------+
| TABLE_NAME   |
+--------------+
| customers    |
| employees    |
| offices      |
| orderdetails |
| orders       |
| payments     |
| productlines |
| products     |
+--------------+
8 rows in set (0.02 sec)
```

**Bước 2:** Tạo lệnh SQL, ở đây sử dụng hàm `GROUP_CONCAT` và `CONCAT`:

```sql
SELECT 
    CONCAT(GROUP_CONCAT(CONCAT('SELECT \'',
                        table_name,
                        '\' table_name,COUNT(*) rows FROM ',
                        table_name)
                SEPARATOR ' UNION '),
            ' ORDER BY table_name')
INTO @sql 
FROM
    table_list;
```

Trong câu truy vấn này, `table_list` là danh sách các tên bảng là kết quả của câu truy vấn trong bước 1.

Câu truy vấn dưới sử dụng truy vấn đầu tiên như là derived table và trả về câu lệnh SQL như 1 chuỗi:

```sql
SELECT 
    CONCAT(GROUP_CONCAT(CONCAT('SELECT \'',
                        table_name,
                        '\' table_name,COUNT(*) rows FROM ',
                        table_name)
                SEPARATOR ' UNION '),
            ' ORDER BY table_name')
INTO @sql 
FROM
    (SELECT 
        table_name
    FROM
        information_schema.tables
    WHERE
        table_schema = 'classicmodels'
            AND table_type = 'BASE TABLE') table_list
```

Nếu MySQL của bạn từ 8.0+ thì bạn có thể dùng [MySQL CTE (common table expression)](/2019/05/23/gioi-thieu-va-cach-su-dung-cte-trong-mysql/) thay vì derived table:

```sql
WITH table_list AS (
SELECT
    table_name
  FROM information_schema.tables 
  WHERE table_schema = 'classicmodels' AND
        table_type = 'BASE TABLE'
) 
SELECT CONCAT(
            GROUP_CONCAT(CONCAT("SELECT '",table_name,"' table_name,COUNT(*) rows FROM ",table_name) SEPARATOR " UNION "),
            ' ORDER BY table_name'
        )
INTO @sql
FROM table_list; 
```

**Bước 3:** thực thi câu lệnh `@sql` sử dụng các lệnh đã được chuẩn bị:

```sql
PREPARE s FROM  @sql;
EXECUTE s;
DEALLOCATE PREPARE s;
```

![MySQL Row Count Example](/wp-content/uploads/2019/05/MySQL-Row-Count-Example.png)

### Đếm số bản ghi của tất cả bảng trong database với 1 câu truy vấn
Cách khác để lấy số bản ghi của tất cả bảng trong database là truy vấn dữ liệu trực tiếp từ database `information_schema`:

```sql
SELECT 
    table_name, 
    table_rows
FROM
    information_schema.tables
WHERE
    table_schema = 'classicmodels'
ORDER BY table_name;
```

![MySQL Row Count](/wp-content/uploads/2019/05/MySQL-Row-Count.png)

Cách này đôi khi cho kết quả không chính xác bởi vì số bản ghi trong `information_schema` và số bản ghi thực tế của bảng là không được đồng bộ. Cho nên để tránh điều này thì bạn phải chạy lệnh `ANALYZE TABLE` trước khi đếm số bản ghi từ `information_schema`.

```sql
ANALYZE TABLE table_name, ...;
```

Hãy like, share và comment để cùng nhau học tập ! ^^