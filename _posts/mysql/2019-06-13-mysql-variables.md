---
layout: post
title: MySQL Variables
categories: [MySQL]
date: 2019-06-13 09:00:00 +0700
description: 
img: # Add image post ex: viet-dep-zai.jpg (optional)
fig-caption: # Add figcaption (optional)
tags: [mysql, mysql variable]
---

Bài viết này sẽ hướng dẫn cách sử dụng biến trong các câu lệnh SQL

## Giới thiệu về biến trong MySQL

Biến trong câu lệnh SQL dùng để tái sử dụng ở nhiều chỗ trong nhiều câu lệnh SQL khác.

Cú pháp đặt biến: `@tên_biến`, trong đó `tên_biến` là các ký tự alphanumeric. Độ dài tối đa của biến là 64 ký tự (trong MySQL 5.7.5)

Biến không phân biệt chữ hoa chữ thường. 2 biến `@id` và `@ID` là như nhau.

Kiểu biến có thể là: integer, floating point, decimal, string hoặc NULL.

Biến khi được định nghĩa chỉ có thể sử dụng trong cùng 1 session và sẽ không lưu lại cho các session sau.

Lưu ý: cách định nghĩa biến này chỉ trên MySQL có thể sẽ không đúng trong 1 số các hệ thống database khác. 

## Gán giá trị cho biến

Có 2 cách để gán giá trị cho biến.

### Cách 1: sử dụng `SET`:

```sql
SET @variable_name := value;
```

Cả 2 toán tử `:=` hoặc `=` đều dùng được với `SET`

1 ví dụ:

```sql
SET @counter := 100;
```

### Cách 2: sử dụng `SELECT`:

Chỉ được phép sử dụng toán tử `:=` trong lệnh `SELECT`. Toán tử `=` sẽ hiểu nhầm là toán tử so sánh bằng trong trường hợp này.

```sql
SELECT @variable_name := value;
```

Sau khi gán giá trị biến. Bạn có thể sử dụng ở các lệnh SQL khác như trong mệnh đề `WHERE`, lệnh `INSERT` hoặc `UPDATE`.

## Ví dụ khai báo biến trong MySQL

Giả sử bạn muốn lấy danh sách các sản phẩm đắt nhất trong bảng `products` và gán vào biến`@msrp`:

```sql
SELECT 
    @msrp:=MAX(msrp)
FROM
    products;
```

![MySQL Variables Example](/wp-content/uploads/2019/06/MySQL-Variables-Example.jpg)

Chúng ta sẽ sử dụng biến `@msrp` để lấy thông tin sản phẩm đắt nhất:

```sql
SELECT 
    productCode, productName, productLine, msrp
FROM
    products
WHERE
    msrp = @msrp;
```

Trong 1 vài trường hợp, bạn sẽ phải chèn dữ liệu vào 1 bảng, sau đó lấy giá trị `id` vừa mới chèn và sử dụng để chèn dữ liệu vào 1 bảng khác. Trường hợp này bạn có thể sử dụng biến để lưu giá trị `id` mới nhất, được tạo bởi `AUTO_INCREMENT`.

```sql
SELECT @id:=LAST_INSERT_ID();
```

Biến chỉ có thể lưu 1 giá trị, nếu lệnh `SELECT` trả về nhiều giá trị, biến sẽ lấy giá trị của dòng cuối cùng trong kết quả trả về.

```sql
SELECT 
    @buyPrice:=buyprice
FROM
    products
WHERE
    buyprice > 95
ORDER BY buyprice;
```

![MySQL Variable multiple rows](/wp-content/uploads/2019/06/MySQL-Variable-multiple-rows.jpg)

```sql
SELECT @buyprice;
```

![MySQL select variable](/wp-content/uploads/2019/06/MySQL-select-variable.jpg)

Như vậy là các bạn có thể sử dụng biến trong MySQL với nhiều mục đích khác nhau. 

Hi vọng bài viết hữu ích cho bác bạn.

Hãy like, share và comment để cùng học tập nhé.