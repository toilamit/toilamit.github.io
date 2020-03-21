---
layout: post
title: MySQL REGEXP - Search Based On Regular Expressions
categories: [MySQL]
date: 2019-07-26 09:00:00 +0700
description: 
img: # Add image post ex: viet-dep-zai.jpg (optional)
fig-caption: # Add figcaption (optional)
tags: [mysql, mysql regular expressions]
---

Bài viết sẽ hướng dẫn bạn cách sử dụng toán tử `REGEXP` để tìm kiếm phức tạp dựa trên các biểu thức chính quy.

## Giới thiệu về biểu thức chính quy

Biểu thức chính quy (regular expression) là 1 chuỗi đặc biệt mô tả các mẫu tìm kiếm. Nó là 1 công cụ mạnh mẽ cung cấp cho bạn cách ngắn gọn và linh hoạt để xác định các chuỗi văn bản. Ví dụ: các ký tự, và các từ dựa trên các mẫu.

Đơn giản, bạn có thể sử dụng regular expression để tìm kiếm email, địa chỉ IP, số điện thoại, hoặc bất kỳ thứ gì mà có mẫu cụ thể.

Biểu thức chính quy sử dụng cú pháp riêng mà có thể được giải thích bằng bộ xử lý biểu thức chính quy. Biểu thức chính quy được sử dụng rộng rãi trên hầu hết các nền tảng từ ngôn ngữ lập trình (Javascript, PHP, Python, ...) đến cơ sở dữ liệu bao gồm cả MySQL.

Ưu điểm của việc sử dụng `REGEXP` hơn so với toán tử `LIKE` là không bị giới hạn tìm kiếm bởi việc cố định các mẫu tìm kiếm với dấu `%` và dấu gạch dưới `_`. Biểu thức chính quy linh hoạt hơn trong việc tạo ra các mẫu tìm kiếm.

Nhược điểm là nó rất khó để hiểu và bảo trì với các mẫu phức tạp. Do đó, bạn nên mô tả ý nghĩa của biểu thức chính quy trong comment của lệnh SQL. Hơn nữa là tốc độ trả về dữ liệu sẽ giảm đi nếu mẫu phức tạp trong biểu thức chính quy.

Vì vậy hãy cân nhắc trước khi sử dụng biểu thức chính quy phức tạp.

Viết tắt của biểu thức chính quy: regex hoặc regexp.

## Toán tử REGEXP

Đoạn mã dưới sử dụng toán tử REGEXP trong mệnh đề WHERE

```sql
SELECT 
    column_list
FROM
    table_name
WHERE
    string_column REGEXP pattern;
```

Lệnh trên thực hiện việc khớp mẫu của `string_column` với `pattern`.

Nếu giá trị của string_column khớp với pattern thì biểu thức trong mệnh đề WHERE sẽ trả về true, ngược lại là false.

Nếu hoặc string_column hoặc pattern là NULL, thì kết quả là NULL.

Ngoài toán tử REGEXP thì bạn có thể sử dụng toán tử RLIKE, tương đồng với toán tử REGEXP.

Trái ngược với toán tử REGEXP là NOT REGEXP.

## Ví dụ sử dụng REGEXP

Giả sử bạn muốn tìm tất cả các sản phẩm với last name bắt đầu bằng chữ cái A, B hoặc C:

```sql
SELECT 
    productname
FROM
    products
WHERE
    productname REGEXP '^(A|B|C)'
ORDER BY productname;
```

![MySQL REGEXP Example](http://www.mysqltutorial.org/wp-content/uploads/2009/12/MySQL-REGEXP-Example.jpg)

Giải thích pattern 1 chút:

- Kí tự ^ nghĩa là khớp từ kí tự đầu tiên của chuỗi.
- Kí tự | nghĩa là tìm kiếm các lựa chọn thay thế nếu như không phù hợp.

Bảng sau miêu tả một số ký tự và cấu trúc thường được dùng trong biểu thức chính quy.

| Metacharacter | Behavior |
|---|---|
| ^ | khớp với vị trí đầu tiên của chuỗi được search |
| $ | khớp tới vị trí cuối của chuỗi được search |
| . | khớp với bất kỳ kí tự nào |
| […] | khớp với bất kỳ kí tự nào được chỉ ra trong dấu ngoặc vuông |
| [^…] | khớp với bất kỳ kí tự nào không được chỉ ra trong dấu ngoặc vuông |
| p1|p2 | khớp với bất kỳ mẫu nào giữa p1 hoặc p2 |
| * | khớp với ký tự trước 0 hoặc nhiều lần |
| + | khớp với 1 ký tự trước đó hoặc nhiều lần |
| {n} | khớp n số lần của ký tự trước |
| {m,n} | khớp từ m tới n số lần của ký tự trước |

Để tìm các sản phẩm có tên bắt đầu với ký tự `a` thì dùng kí hiệu `'^'`:

```sql
SELECT 
    productname
FROM
    products
WHERE
    productname REGEXP '^a';
```

![MySQL REGEXP regular expression example](http://www.mysqltutorial.org/wp-content/uploads/2009/12/MySQL-REGEXP-regular-expression-example.jpg)

Nếu bạn muốn toán tử REGEXP so sánh chuỗi phân biệt hoa thường thì bạn có thể sử dụng toán tử BINARY để ép kiểu string về kiểu binary string.

Bởi vì MySQL so sánh binary string theo byte thay vì theo từng ký tự. Đồng nghĩa việc nó so sánh phân biệt hoa thường.

Ví dụ sau sẽ tìm tên sản phẩm bắt đầu bằng chữ `C`:

```sql
SELECT 
    productname
FROM
    products
WHERE
    productname REGEXP BINARY '^C';
```

![MySQL REGEXP with C beginning](http://www.mysqltutorial.org/wp-content/uploads/2009/12/MySQL-REGEXP-with-C-beginning.jpg)

Tìm tên sản phẩm kết thúc bằng chữ `f`:

```sql
SELECT 
    productname
FROM
    products
WHERE
    productname REGEXP 'f$'
```

![MySQL REGEXP ends with f](http://www.mysqltutorial.org/wp-content/uploads/2009/12/MySQL-REGEX-ends-with-f.jpg)

Tìm tên sản phẩm có chứa chữ `ford`:

```sql
SELECT 
    productname
FROM
    products
WHERE
    productname REGEXP 'ford';
```

![MySQL REGEXP contains Ford](http://www.mysqltutorial.org/wp-content/uploads/2009/12/MySQL-REGEXP-contains-Ford.jpg)

Tìm tên sản phẩm có chính xác 10 ký tự:

```sql
SELECT 
    productname
FROM
    products
WHERE
    productname REGEXP '^.{10}$';
```

![MySQL REGEXP 10 characters](http://www.mysqltutorial.org/wp-content/uploads/2009/12/MySQL-REGEXP-10-characters.jpg)
