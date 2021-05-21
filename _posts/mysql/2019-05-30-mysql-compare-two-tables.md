---
layout: post
title: MySQL Compare Two Tables
categories: [MySQL]
date: 2019-05-30 09:00:00 +0700
description: 
img: # Add image post ex: viet-dep-zai.jpg (optional)
fig-caption: # Add figcaption (optional)
tags: [mysql, mysql compare tables]
---

Bài viết này sẽ hướng dẫn bạn so sánh 2 bảng để tìm ra các bản ghi khác nhau.

Trong data migration chúng ta thường so sánh 2 bảng để tìm ra các bản ghi không khớp nhau.

Ví dụ, chúng ta có 1 database mới với schema khác với database cũ. Nhiệm vụ là migrate toàn bộ dữ liệu từ database cũ sang database mới và xác nhận việc dữ liệu được migrate chính xác.

Để kiểm tra dữ liệu, chúng ta phải so sánh 2 bảng, 1 trong database mới và 1 trong database cũ và chỉ ra bản ghi không khớp.

Giả sử, chúng ta có 2 bảng `t1` và `t2`. Các bước sau so sánh 2 bảng và chỉ ra các bản ghi không khớp:

**Bước 1:** Sử dụng lệnh `UNION` để gộp 2 rows trong cả 2 bảng; chỉ lấy cột cần so sánh thôi. Kết quả trả về được sử dụng để so sánh.

```sql
SELECT t1.pk, t1.c1
FROM t1
UNION ALL
SELECT t2.pk, t2.c1
FROM t2
```

**Bước 2:** Nhóm các bản ghi dựa vào primary key và cột cần thiết để so sánh. Nếu giá trị trong cột dùng để so sánh là giống nhau thì `COUNT(*)` trả về 2, ngược lại trả về 1.

Hãy xem truy vấn sau:

```sql
SELECT pk, c1
FROM
 (
   SELECT t1.pk, t1.c1
   FROM t1
   UNION ALL
   SELECT t2.pk, t2.c1
   FROM t2
)  t
GROUP BY pk, c1
HAVING COUNT(*) = 1
ORDER BY pk
```

Nếu toàn bộ kết quả so sánh là giống nhau thì không có row nào trả về

### Ví dụ so sánh 2 bảng trong MySQL

Ví dụ dưới mô tả các bước ở trên:

**Bước 1:** Tạo ra 2 bảng với structure tương tự nhau:

```sql
CREATE TABLE t1(
 id int auto_increment primary key,
    title varchar(255) 
);
 
CREATE TABLE t2(
 id int auto_increment primary key,
    title varchar(255),
    note varchar(255)
);
```

**Bước 2:** Thêm vào 1 số bản ghi:

```sql
INSERT INTO t1(title)
VALUES('row 1'),('row 2'),('row 3');
 
INSERT INTO t2(title,note)
SELECT title, 'data migration'
FROM t1;
```

**Bước 3:** So sánh giá trị cột `id` và `title`:

```sql
SELECT id,title
FROM (
SELECT id, title FROM t1
UNION ALL
SELECT id,title FROM t2
) tbl
GROUP BY id, title
HAVING count(*) = 1
ORDER BY id;
```

Không có row nào trả về vì các bản ghi đều khớpn

**Bước 4:** Thêm mới 1 bản ghi vào bảng `t2`:

```sql
INSERT INTO t2(title,note)
VALUES('new row 4','new');
```

**Bước 5:** Thực thi truy vấn để so sánh giá trị của cột `title`. Khi đó bản ghi mới sẽ được trả về vì nó là bản ghi không khớp nhau giữa 2 table.

![MySQL compare two tables example](/wp-content/uploads/2019/05/compare-two-tables-example.png)
