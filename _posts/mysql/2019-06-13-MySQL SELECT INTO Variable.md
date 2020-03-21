---
layout: post
title: MySQL SELECT INTO Variable
categories: [MySQL]
date: 2019-06-13 09:00:00 +0700
description: 
img: # Add image post ex: viet-dep-zai.jpg (optional)
fig-caption: # Add figcaption (optional)
tags: [mysql, mysql select into]
---

Bài viết này sẽ hướng dẫn bạn lưu các kết quả truy vấn vào biến sử dụng `SELECT INTO variables`

## Cú pháp MySQL `SELECT INTO Variable`

```sql
SELECT 
    c1, c2, c3, ...
INTO 
    @v1, @v2, @v3,...
FROM 
    table_name
WHERE 
    condition;
```

Giải thích cú pháp:

- c1, c2, và c3 là các cột hoặc biểu thức mà bạn muốn select và lưu vào biến.
- @v1, @v2, và @v3 là các biến lưu giá trị của c1, c2 và c3.

Số lượng biến phải giống số lượng cột hoặc biểu thức. Thêm nữa là truy vấn phải trả về 0 hoặc 1 row.

Nếu truy vấn trả về 0 row, MySQL sẽ báo warning và giá trị biến không hề thay đổi.

Trong trường hợp truy vấn trả về nhiều row, MySQL báo 1 error. Và để đảm bảo truy vấn lúc nào cũng trả về 1 row, thì bạn sử dụng `LIMIT 1`.

## Ví dụ sử dụng MySQL `SELECT INTO Variable`

Chúng ta sẽ sử dụng bảng `customers` trong [database mẫu](/2019/05/23/download-mysql-sample-database/) để làm ví dụ:

![products table](/wp-content/uploads/2019/06/products_table.png)

### Ví dụ MySQL SELECT INTO single variable

Ví dụ sau lấy city của khách hàng có number là 103 và lưu vào biến `@city`:

```sql
SELECT 
    city
INTO
    @city
FROM 
    customers
WHERE 
    customerNumber = 103;
```

Xem giá tị biến `@city`:

```sql
SELECT 
    @city;
```

### Ví dụ MySQL SELECT INTO multiple variables

Để lưu nhiều giá trị vào nhiều biến, bạn sử dụng dấu phẩy để tách biệt. Ví dụ sau tìm kiếm city và country của khách hàng có number là 103 và lưu vào 2 biến tương ứng là `@city` và `@country`:

```sql
SELECT 
    city,
    country 
INTO
    @city,
    @country
FROM 
    customers
WHERE 
    customerNumber = 103;
```

Xem giá trị 2 biến `@city` và `@country`:

```sql
SELECT 
    @city, 
    @country;
```

![MySQL Select Into multiple variables example](/wp-content/uploads/2019/06/MySQL-Select-Into-multiple-variables-example.png)

### Ví dụ MySQL SELECT INTO variable – multiple rows

Lệnh sau sẽ báo error vì truy vấn trả về nhiều rows:

```sql
SELECT 
    creditLimit
INTO
    @creditLimit
FROM 
    customers
WHERE 
    customerNumber > 103;
```

Kết quả:

```console
Error Code: 1172. Result consisted of more than one row
```

Để sửa lỗi, thì sử dụng `LIMIT 1`:

```sql
SELECT 
    creditLimit
INTO
    @creditLimit
FROM 
    customers
WHERE 
    customerNumber > 103
LIMIT 1;
```

Như vậy là các bạn có thể sử dụng MySQL `SELECT INTO variable` để lưu các kết quả trong truy vấn và lưu vào biến, để sử dụng cho lần sau.

Hi vọng bài viết hữu ích cho các bạn.

Hãy like, share và comment để cùng nhau học nhé.
