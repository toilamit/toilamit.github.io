---
layout: post
title: How To Delete Duplicate Rows in MySQL
categories: [MySQL]
date: 2019-05-30 09:00:00 +0700
description: 
img: # Add image post ex: viet-dep-zai.jpg (optional)
fig-caption: # Add figcaption (optional)
tags: [mysql, mysql duplicate rows]
---

Trong bài viết này sẽ hướng dẫn bạn các cách để xóa dữ liệu trùng lặp trong MySQL.

Ở bài viết trước, chúng ta đã biết cách [tìm ra các dữ liệu trùng lặp](/2019/05/30/huong-dan-tim-cac-ban-ghi-trung-lap-trong-mysql/). Và khi đã tìm được dữ liệu trùng lặp thì chúng ta sẽ xóa chúng đi để làm sạch database.

### Chuẩn bị dữ liệu

Đoạn code dưới sẽ tạo bảng `contacts` và thêm vào một vài dữ liệu để làm mẫu:

```sql
DROP TABLE IF EXISTS contacts;
 
CREATE TABLE contacts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL, 
    email VARCHAR(255) NOT NULL
);
 
INSERT INTO contacts (first_name,last_name,email) 
VALUES ('Carine ','Schmitt','carine.schmitt@verizon.net'),
       ('Jean','King','jean.king@me.com'),
       ('Peter','Ferguson','peter.ferguson@google.com'),
       ('Janine ','Labrune','janine.labrune@aol.com'),
       ('Jonas ','Bergulfsen','jonas.bergulfsen@mac.com'),
       ('Janine ','Labrune','janine.labrune@aol.com'),
       ('Susan','Nelson','susan.nelson@comcast.net'),
       ('Zbyszek ','Piestrzeniewicz','zbyszek.piestrzeniewicz@att.net'),
       ('Roland','Keitel','roland.keitel@yahoo.com'),
       ('Julie','Murphy','julie.murphy@yahoo.com'),
       ('Kwai','Lee','kwai.lee@google.com'),
       ('Jean','King','jean.king@me.com'),
       ('Susan','Nelson','susan.nelson@comcast.net'),
       ('Roland','Keitel','roland.keitel@yahoo.com');
```

Chú ý: bạn có thể chạy lại đoạn code trên sau khi bạn thực hiện các lệnh `DELETE`.


Tìm dữ liệu trùng lặp `email`:

```sql
SELECT 
    email, COUNT(email)
FROM
    contacts
GROUP BY 
    email
HAVING 
    COUNT(email) > 1;
```

![Delete duplicate rows in MySQL](/wp-content/uploads/2019/05/MySQL-find-duplicate-values-example.png)

Chúng ta có 4 kết quả trùng lặp

### A) Sử dụng `DELETE JOIN` để xóa dữ liệu trùng

Truy vấn sau sẽ xóa các dữ liệu trùng và giữ lại dữ liệu có `id` lớn nhất:

```sql
DELETE t1 FROM contacts t1
        INNER JOIN
    contacts t2 
WHERE
    t1.id < t2.id AND t1.email = t2.email;
```

Kết quả:

```sql
Query OK, 4 rows affected (0.10 sec)
```

Bây giờ thử tìm lại các `email` trùng lặp:

```sql
SELECT 
    email, 
    COUNT(email)
FROM
    contacts
GROUP BY 
    email
HAVING 
    COUNT(email) > 1;
```

Kết quả trả về rỗng, như vậy không có dữ liệu trùng lặp `email`

Kiểm tra lại lần nữa:

```sql
SELECT 
    *
FROM
    contacts;
```

![MySQL delete duplicate rows - DELETE JOIN keeps Highest ID](/wp-content/uploads/2019/05/MySQL-delete-duplicate-rows-DELETE-JOIN-keeps-Highest-ID.png)

Các rows với id 2, 4, 7, và 9 đã được xóa.

Trong trường hợp khi xóa dữ liệu trùng mà vẫn muốn giữ lại `id` bé nhất thì sử dụng query sau:

```sql
DELETE t1 FROM contacts t1
        INNER JOIN
    contacts t2 
WHERE
    t1.id > t2.id AND t1.email = t2.email;
```

Bạn có thể thực hiện lại việc tạo dữ liệu mẫu của bảng `contacts` và test lại truy vấn trên. Kết quả như hình dưới:

![MySQL delete duplicate rows - DELETE JOIN keeps lowest ID](/wp-content/uploads/2019/05/MySQL-delete-duplicate-rows-DELETE-JOIN-keeps-lowest-ID.png)

### B) Sử dụng bảng trung gian để xóa dữ liệu trùng lặp.

Dưới đây là các bước mà các bạn có thể sử dụng bảng trung gian (intermediate table) để xóa dữ liệu trùng lặp:

1. Tạo mới 1 bảng với cùng structure với bảng mà bạn muốn xóa dữ liệu trùng lặp (tạm gọi là bảng gốc).
2. Thêm mới đơn nhất dữ liệu từ bảng gốc sang bảng trugn gian.
3. Xóa bảng gốc và đổi tên bảng trung gian về tên của bảng gốc.

Các bước thực hiện như sau:

**Bước 1**

```sql
CREATE TABLE source_copy LIKE source;
```

**Bước 2**

```sql
INSERT INTO source_copy
SELECT * FROM source
GROUP BY col; -- column that has duplicate values
```

**Bước 3**

```sql
DROP TABLE source;
ALTER TABLE source_copy RENAME TO source;
```

Ví dụ, xóa các bản ghi trùng lặp `email`:

```sql
-- step 1
CREATE TABLE contacts_temp 
LIKE contacts;
 
-- step 2
INSERT INTO contacts_temp
SELECT * 
FROM contacts 
GROUP BY email;
 
 
-- step 3
DROP TABLE contacts;
 
ALTER TABLE contacts_temp 
RENAME TO contacts;
```

### C) Sử dụng hàm `ROW_NUMBER()` để xóa dữ liệu trùng lặp

> Lưu ý hàm `ROW_NUMBER()` chỉ được hỗ trợ từ MySQL 8.02 do đó hãy check lại version của MySQL trước khi sử dụng.

Lệnh sau sẽ sử dụng hàm `ROW_NUMBER()` để gán liên tiếp số nguyên cho mỗi row. Nếu `email` trùng lặp thì số row sẽ lớn hơn 1.

```sql
SELECT 
 id,
    email,
 ROW_NUMBER() OVER (
 PARTITION BY email
 ORDER BY email) AS row_num
FROM 
 contacts
```

Lệnh sau trả về danh sách `id` của các rows trùng lặp:

```sql
SELECT 
 id 
FROM (
 SELECT 
 id,
 ROW_NUMBER() OVER (
 PARTITION BY email
 ORDER BY email) AS row_num
 FROM 
 contacts
) t
WHERE 
 row_num > 1;
```

![MySQL Delete Duplicate Rows - ROW_NUMBER function with subquery](/wp-content/uploads/2019/05/MySQL-Delete-Duplicate-Rows-ROW_NUMBER-function-with-subquery.png)

Cuối cùng, có thể xóa các dữ liệu trùng bằng lệnh `DELETE` cùng với subquery trong mệnh đề `WHERE`:

```sql
DELETE FROM contacts 
WHERE 
 id IN (
 SELECT 
 id 
 FROM (
 SELECT 
 id,
 ROW_NUMBER() OVER (
 PARTITION BY email
 ORDER BY email) AS row_num
 FROM 
 contacts
 
 ) t
    WHERE row_num > 1
);
```

Kết quả với message:

```sql
4 row(s) affected
```
