---
layout: post
title: Hiểu về comment trong MySQL
permalink: /mysql/hieu-ve-comment-trong-mysql
date: 2019-12-19 13:47:00 +0700
description: 
img: # Add image post ex: viet-dep-zai.jpg (optional)
fig-caption: # Add figcaption (optional)
tags: [mysql, mysql comment]
---

Bài viết sẽ hướng dẫn cách sử dụng comment trong câu lệnh SQL hoặc các khối code trong MySQL.

## Comments
Comments thường được dùng để cung cấp thông tin cho các câu lệnh SQL hoặc các khối code logic trong các stored procedure. Khi parsing mã SQL, MySQL bỏ qua các comments. Nó chỉ chạy các phần SQL ngoại trừ các comment có thể chạy được, điều mà chúng ta sẽ thảo luận trong phần tiếp theo.

MySQL hỗ trợ 3 kiểu comment:

Bắt đầu từ dấu `-- ` cho tới cuối dòng. Kiểu này bắt buộc có ít nhất 1 khoảng trắng hoặc các kí tự điều khiển (space, tab, newline, etc) sau dấu gạch thứ 2.

```sql
SELECT * FROM users; -- This is a comment
```

Lưu ý là SQL chuẩn không yêu cầu khoảng trắng đằng sau dấu gạch thứ 2. Còn MySQL sử dụng để tránh các vấn đề liên quan tới cấu trúc SQL như là:

```sql
SELECT 10--1;
```

Thông thường lệnh trên sẽ trả về giá trị 11. Nếu như MySQL không dùng khoảng trắng thì sẽ trả về giá trị 10.

Bắt đầu từ dấu `#` tới cuối dòng

```sql
SELECT 
    lastName, firstName
FROM
    employees
WHERE
    reportsTo = 1002; # get subordinates of Diane
```

Kiểu comment của ngôn ngữ C `/**/` có thể viết trên nhiều dòng

```sql
/*
    Get sales rep employees
    that reports to Anthony
*/
 
SELECT 
    lastName, firstName
FROM
    employees
WHERE
    reportsTo = 1143
        AND jobTitle = 'Sales Rep';
```

Lưu ý là MySQL không hỗ trợ các comments lồng nhau

## Executable comments (comments thực thi được)
MySQL cung cấp executable comments để hỗ trợ tương thích giữa các cơ sở dữ liệu khác nhau. Những comments này cho phép dùng mã SQL mà chỉ chạy trong MySQL nhưng không chạy trong các cơ sở dữ liệu khác.

Mô phỏng cú pháp executable comment:

```sql
/*! MySQL-specific code */
```

Ví dụ sử dụng executable comment:

```sql
SELECT 1 /*! +1 */
```

Lệnh trên sẽ trả về kết quả là 2 thay vì là 1, và trả về là 1 nếu thực hiện ở hệ thống cơ sở dữ liệu khác.

Trong trường hợp chỉ chạy comment từ 1 phiên bản chính xác nào đó của MySQL thì sử dụng cú pháp sau:

```sql
/*!##### MySQL-specific code */
```

Chuỗi ‘#####’ là phiên bản tối thiểu của MySQL mà có thể thực thi comment được. Dấu # đầu tiên là phiên bản lớn như 5 hoặc 8. 2 số tiếp theo (##) là phiên bản nhỏ hơn và 2 số cuối là bản vá của phiên bản.

Ví dụ sau chỉ thực hiện ở phiên bản MySQL 5.1.10 hoặc mới hơn:

```sql
CREATE TABLE t1 (
    k INT AUTO_INCREMENT,
    KEY (k)
)  /*!50110 KEY_BLOCK_SIZE=1024; */
```

Vậy là với bài viết này các bạn đã hiểu hơn về comment trong MySQL và cách sử dụng chúng. Hi vọng bài viết có ích cho các bạn. Chúc các bạn học tốt và đừng quên like share & comment nhé.
