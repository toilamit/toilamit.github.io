---
layout: post
title: How To Find Duplicate Values in MySQL
categories: [MySQL]
date: 2019-05-30 09:00:00 +0700
description: 
img: # Add image post ex: viet-dep-zai.jpg (optional)
fig-caption: # Add figcaption (optional)
tags: [mysql, mysql duplicate values]
---

Bài viết này sẽ hướng dẫn bạn cách tìm các dữ liệu trùng lặp trong 1 hoặc nhiều cột.

### Mở đầu

Trùng lặp dữ liệu xảy ra rất nhiều trong database với nhiều lý do khác nhau. Việc tìm ra dữ liệu trùng lặp là 1 nhiệm vụ quan trọng mà bạn phải đối mặt khi làm việc với database.

Để mô tả điều này, chúng ta sẽ tạo ra 1 bảng `contacts` với 4 cột: `id`, `first_name`, `last_name`, và `email`.

```sql
CREATE TABLE contacts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL
);
```

Và thêm vào 1 số bản ghi:

```sql
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

```sql
SELECT 
    *
FROM
    contacts;
```

![MySQL find duplicate values - Sample Data](/wp-content/uploads/2019/05/MySQL-find-duplicate-values.png)

Trong bảng `contacts` có 1 vài bản ghi trùng nhau ở các cột `first_name`, `last_name`, `email`, và bây giờ nhiệm vụ là phải tìm ra các bản ghi trùng nhau đó.

### Tìm dữ liệu trùng nhau trong 1 cột

Chúng ta sẽ sử dụng truy vấn sau để tìm các dữ liệu trùng nhau trong 1 cột:

```sql
SELECT 
    col, 
    COUNT(col)
FROM
    table_name
GROUP BY col
HAVING COUNT(col) > 1;
```

Dữ liệu được coi là trùng lặp khi nó xuất hiện nhiều hơn 1 lần trong bảng. Trong lệnh này, chúng ta sử dụng mệnh đề `GROUP BY` với hàm `COUNT` để đếm số dữ liệu ở cột đã chọn (`col`). Điều kiện trong mệnh đề `HAVING` gồm các rows với số đếm lớn hơn 1 - chính là dữ liệu trùng lặp.

Truy vấn sau giúp bạn tìm ra tất cả dữ liệu trùng lặp `email`:

```sql
SELECT 
    email, 
    COUNT(email)
FROM
    contacts
GROUP BY email
HAVING COUNT(email) > 1;
```

Kết quả truy vấn:

![MySQL find duplicate values example](/wp-content/uploads/2019/05/MySQL-find-duplicate-values-example.png)

Bạn thấy đấy, một số rows đã trùng lặp `email`.

### Tìm dữ liệu trùng lặp trong nhiều cột

Bạn có thể sử dụng qeury sau:

```sql
SELECT 
    col1, COUNT(col1),
    col2, COUNT(col2),
    ...
 
FROM
    table_name
GROUP BY 
    col1, 
    col2, ...
HAVING 
       (COUNT(col1) > 1) AND 
       (COUNT(col2) > 1) AND 
       ...
```
Các rows được cho là trùng lặp khi kết hợp các cột là trùng lặp, do đó chúng ta sử dụng toán tử `AND` trong mệnh đề `HAVING`.

Ví dụ, tìm các rows trùng lặp giá trị ở cột `first_name`, `last_name`, `email` chúng ta sử dụng truy vấn sau:

```sql
SELECT 
    first_name, COUNT(first_name),
    last_name,  COUNT(last_name),
    email,      COUNT(email)
FROM
    contacts
GROUP BY 
    first_name , 
    last_name , 
    email
HAVING  COUNT(first_name) > 1
    AND COUNT(last_name) > 1
    AND COUNT(email) > 1;
```

Kết quả:

![MySQL find duplicate values on multiple columns](/wp-content/uploads/2019/05/MySQL-find-duplicate-values-on-multiple-columns.png)
