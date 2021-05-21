---
layout: post
title: MySQL NULL - The Beginner’s Guide
categories: [MySQL]
date: 2019-08-19 09:00:00 +0700
description: 
img: # Add image post ex: viet-dep-zai.jpg (optional)
fig-caption: # Add figcaption (optional)
tags: [mysql, mysql null]
---

Bài viết này sẽ hướng dẫn bạn sử dụng giá trị `NULL` và 1 số các hàm hữu ích để làm việc với giá trị `NULL` một cách hiệu quả.

## Giới thiệu về giá trị NULL trong MySQL

NULL trong MySQL được hiểu là không biết (unknown). Một giá trị `NULL` khác với zero và chuỗi rỗng `''`

Giá trị `NULL` sẽ không bằng chính nó, nếu so sánh giá trị `NULL` với giá trị `NULL` khác hoặc bất kỳ giá trị khác thì kết quả sẽ là `NULL` bởi vì giá trị của mỗi giá trị `NULL` là unknown.

Thông thường, giá trị `NULL` chỉ ra dữ liệu thiếu, unknown hoặc không thích hợp. Ví dụ, số điện thoại có thể là `NULL` và được thêm vào sau.

Khi tạo một bảng, cần chỉ ra cột nào có thể là giá tị `NULL` hoặc không bằng cách sử dụng `NOT NULL`

Ví dụ, lệnh sau tạo ra bảng `leads`:

```sql
CREATE TABLE leads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    source VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(25)
);
```

`id` là cột primary key do đó không được phép `NULL`

Cột `first_name, last_name`, và `source` là `NOT NULL`, do đó không được phép insert giá trị NULL vào các cột này. Còn cột`email` và `phone` có thể là NULL.

Bạn có thể sử dụng giá trị NULL trong lệnh `INSERT` để chỉ ra là dữ liệu thiếu. Ví dụ lệnh sau thiếu dữ liệu của cột `phone`

```sql
INSERT INTO leads(first_name,last_name,source,email,phone)
VALUE('John','Doe','Web Search','john.doe@acme.com',NULL);
```

Vì giá trị mặc định của cột `email` là NULL do đó bạn có thể bỏ qua email trong lệnh INSERT:

```sql
INSERT INTO leads(first_name,last_name,source,phone)
VALUES('Lily','Bush','Cold Calling','(408)-555-1234'),
('David','William','Web Search','(408)-888-6789');
```

![MySQL NULL Insert](/wp-content/uploads/2019/08/MySQL-NULL-Insert.jpg)

## SET NULL trong lệnh UPDATE

Sử dụng toán tử gán (=) để gán giá trị NULL:

```sql
UPDATE leads 
SET 
    phone = NULL
WHERE
    id = 3;
```

## ORDER BY với NULL

Trong MySQL thì NULL được hiểu là có thứ tự thấp nhất, nên khi sort theo thứ tự tăng dần thì các giá trị NULL sẽ được hiển thị đầu tiên:

```sql
SELECT 
    *
FROM
    leads
ORDER BY phone;
```

![MySQL NULL ORDER BY](/wp-content/uploads/2019/08/MySQL-NULL-ORDER-BY.jpg)

Ngược lại nếu sử dụng `ORDER BY DESC` thì các giá trị NULL sẽ xuất hiện ở cuối kết quả trả về:

```sql
SELECT 
    *
FROM
    leads
ORDER BY phone DESC;
```

![MySQL NULL ORDER BY DESC](/wp-content/uploads/2019/08/MySQL-NULL-ORDER-BY-DESC.jpg)

Để kiểm tra giá trị NULL thì bạn sử dụng `IS NULL` hoặc `IS NOT NULL` trong mệnh đề `WHERE`:

```sql
SELECT 
    *
FROM
    leads
WHERE
    phone IS NULL;
```

![MySQL IS NULL](/wp-content/uploads/2019/08/MySQL-IS-NULL.jpg)

Lấy tất cả bản ghi có `email` khác NULL

```sql
SELECT 
    *
FROM
    leads
WHERE
    email IS NOT NULL;
```

![MySQL IS NOT NULL](/wp-content/uploads/2019/08/MySQL-IS-NOT-NULL.jpg)

Mặc dù NULL không bằng NULL nhưng trong mệnh đề `GROUP BY` thì hai giá trị NULL là bằng nhau.

```sql
SELECT 
    id, first_name, last_name, email, phone
FROM
    leads
GROUP BY email;
```

![MySQL NULL with GROUP BY](/wp-content/uploads/2019/08/MySQL-NULL-with-GROUP-BY.jpg)

Truy vấn chỉ trả về 2 bản ghi bởi vì toàn bộ các bản ghi có email là NULL sẽ được gộp làm 1.

## NULL và UNIQUE index

Khi bạn sử dụng một unique constraint hoặc một UNIQUE index trong một cột thì bạn có thể thêm nhiều giá trị NULL vào cột đó. Điều này hoàn toàn bình thường vì trong trường hợp này MySQL xem xét giá trị NULL là riêng biệt.

Để kiểm chứng thì trước tiên tạo 1 `UNIQUE index` cho cột `phone`.

```sql
CREATE UNIQUE INDEX idx_phone ON leads(phone);
```

Chú ý rằng nếu bạn sử dụng BDB storage engine thì MYSQL xem giá trị NULL là bằng nhau do đó bạn sẽ không thể thêm nhiều giá trị NULL vào 1 cột có unique constraint.

### MySQL NULL functions

Một số các hàm làm việc với NULL như: `IFNULL, COALESCE`, và `NULLIF`.

Hàm `IFNULL` có 2 tham số đầu vào, nếu tham số thứ nhất not NULL thì sẽ trả về, ngược lại sẽ trả về giá trị tham số thứ 2.

Ví dụ sau trả về giá trị `'N/A'` nếu giá trị cột `phone` là NULL.

```sql
SELECT 
    id, first_name, last_name, IFNULL(phone, 'N/A') phone
FROM
    leads;
```

![MySQL IFNULL function example](/wp-content/uploads/2019/08/MySQL-IFNULL-function-example.jpg)

Hàm `COALESCE` nhận vào 1 danh sách các tham số và trả về tham số không NULL đầu tiên. Ví dụ dưới đây hiển thị thông tin của lead theo thứ tự thông tin sắp xếp là `phone, email`, và `N/A`.

```sql
SELECT 
    id,
    first_name,
    last_name,
    COALESCE(phone, email, 'N/A') contact
FROM
    leads;
```

![MySQL COALESCE function example](/wp-content/uploads/2019/08/MySQL-COALESCE-function-example.jpg)

Hàm `NULLIF` nhận 2 tham số, nếu 2 tham số bằng nhau, hàm sẽ trả về NULL, nếu không thì trả về tham số đầu tiên.

Hàm `NULLIF` hữu ích khi bạn có cả `NULL` và chuỗi rỗng trong 1 cột. Ví dụ, giả sử insert lỗi bản ghi vào bảng `leads`:

```sql
INSERT INTO leads(first_name,last_name,source,email,phone)
VALUE('Thierry','Henry','Web Search','thierry.henry@example.com','');
```

`phone` là chuỗi rỗng thay vì `NULL`

Nếu bạn muốn lấy thông tin của leads, bạn sẽ nhận được một phone rỗng thay vì email nếu sử dụng câu truy vấn sau:

```sql
SELECT 
    id,
    first_name,
    last_name,
    COALESCE(phone, email, 'N/A') contact
FROM
    leads;
```

![MySQL NULL and Empty String](/wp-content/uploads/2019/08/MySQL-NULL-and-Empty-String.jpg)

Để xử lý lỗi này thì bạn sử dụng hàm `NULLIF` để so sánh phone với chuỗi rỗng, nếu chúng bằng nhau thì trả về NULL bằng không thì trả về giá trị của phone.

```sql
SELECT 
    id,
    first_name,
    last_name,
    COALESCE(NULLIF(phone, ''), email, 'N/A') contact
FROM
    leads;
```

![MySQL NULLIF function example](/wp-content/uploads/2019/08/MySQL-NULLIF-function-example.jpg)
