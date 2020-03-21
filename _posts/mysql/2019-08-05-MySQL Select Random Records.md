---
layout: post
title: MySQL Select Random Records
categories: [MySQL]
date: 2019-08-05 09:00:00 +0700
description: 
img: # Add image post ex: viet-dep-zai.jpg (optional)
fig-caption: # Add figcaption (optional)
tags: [mysql, mysql randome record]
---

Trong bài viết này sẽ hướng dẫn một số kỹ thuật để lấy bản ghi ngẫu nhiên từ 1 bảng trong database.

Trên thực tế, sẽ có một vài trường hợp bạn sẽ phải lấy bản ghi ngẫu nhiên như là:

- Lấy ngẫu nhiên các bài viết trong blog và hiển thị lên sidebar.
- Lấy một chú thích ngẫu nhiên và hiển thị "chú thích trong ngày".
- Lấy ngẫu nhiên các ảnh trong thư viện và sử dụng làm ảnh đại diện.

## Lấy ngẫu nhiên bản ghi sử dụng ORDER BY RAND()

Trong MySQL không tích hợp sẵn lệnh để lấy ngẫu nhiên bản ghi trong bảng. Mà để thực hiện thì chúng ta phải sử dụng hàm `RAND` như lệnh dưới đây:

```sql
SELECT 
    *
FROM
    tbl
ORDER BY RAND()
LIMIT 1;
```

Giải thích 1 chút nhé:

- Hàm `RAND()` tạo ra một giá trị ngẫu nhiên cho mỗi dòng trong bảng.
- `ORDER BY` sắp xếp tất cả các dòng trong bảng bằng số ngẫu nhiên được tạo bởi hàm `RAND()`.
- `LIMIT` lấy dòng đầu tiên trong kết quả trả về một cách ngẫu nhiên.

Trường hợp nếu bạn muốn lấy `N` bản ghi ngẫu nhiên thì bạn chỉ cần thay đổi giá trị của `LIMIT`.

```sql
SELECT 
    *
FROM
    table
ORDER BY RAND()
LIMIT N;
```

Ví dụ lấy ngẫu nhiên 5 customer trong bảng `customers`:

```sql
SELECT 
    t.customerNumber, t.customerName
FROM
    customers AS t
ORDER BY RAND()
LIMIT 5;
```

![mysql select random customers](http://www.mysqltutorial.org/wp-content/uploads/2009/12/mysql-select-random-customers.jpg)

Vì nó là ngẫu nhiên nên kết quả của bạn khi chạy query có thể là sẽ khác với trong ảnh. Không sao đâu :D.

Cách này rất tốt với bảng nhỏ, nhưng với bảng lớn thì sẽ rất chậm vì MySQL phải sắp xếp rồi mới lấy ra ngẫu nhiên. Và do đó tốc độ truy vấn sẽ phụ thuốc vào số dòng của bảng. Càng nhiều dòng thì càng tốn thời gian để tạo ra số ngẫu nhiên cho mỗi dòng.

## Lấy ngẫu nhiên bản ghi sử dụng INNER JOIN

Cách này có yêu cầu là trong bảng phải có trường primary key tự tăng và không có dòng trống xen kẽ.

Truy vấn sau chỉ ra cách tạo một số ngẫu nhiên dựa vào cột primary key:

```sql
SELECT 
    ROUND(RAND() * ( SELECT 
                MAX(id)
            FROM
                table)) as id;
```

Tiếp theo chúng ta sẽ join bảng với các kết quả được trả bởi query trên:

```sql
SELECT 
    t.*
FROM
    table AS t
        JOIN
    (SELECT 
        ROUND(RAND() * (SELECT 
                    MAX(id)
                FROM
                    table )) AS id
    ) AS x
WHERE
    t.id >= x.id
LIMIT 1;
```

Nếu sử dụng cách này thì bạn phải thực hiện truy vấn nhiều lần để lấy nhiều hơn 1 dòng ngẫu nhiên bởi vì khi mà bạn tăng giá trị limit thì truy vấn sẽ chỉ trả lại các dòng theo tuần tự bắt đầu từ dòng được chọn một cách ngẫu nhiên.

Ví dụ lấy ngẫu nhiên 1 customer từ bảng `customers`

```sql
SELECT 
    t.customerNumber, t.customerName
FROM
    customers AS t
        JOIN
    (SELECT 
        ROUND(RAND() * (SELECT 
                    MAX(customerNumber)
                FROM
                    customers)) AS customerNumber
    ) AS x
WHERE
    t.customerNumber >= x.customerNumber
LIMIT 1;
```

![mysql select random customers using join](http://www.mysqltutorial.org/wp-content/uploads/2009/12/mysql-select-random-customers-using-join1.jpg)

## Lấy giá trị ngẫu nhiên sử dụng biến

Điều kiện để dùng cách này là bảng phải có cột `id` và giá trị từ 1..N và không có dòng trống nào trong khoảng đó.

- Đầu tiên, lấy số ngẫu nhiên trong khoảng 1..N.
- Sau đó chọn bản ghi dựa vào số ngẫu nhiên.

```sql
SELECT 
    table. *
FROM
    (SELECT 
        ROUND(RAND() * (SELECT 
                    MAX(id)
                FROM
                    table)) random_num,
            @num:=@num + 1
    FROM
        (SELECT @num:=0) AS a, table
    LIMIT N) AS b,
    table AS t
WHERE
    b.random_num = t.id;
```

Chú ý là các biến người dùng tự định nghĩa là các kết nối rõ ràng. Có nghĩa là cách này không thể được sử dụng với các kết nối chung. Thêm nữa là primary key phải là kiểu integer và giá trị của nó là tuần tự mà không có chỗ gián đoạn nào xen kẽ.

Trên đây là 1 vài cách cơ bản để có thể lấy giá trị ngẫu nhiên mong muốn. Nếu bạn còn cách nào hay và tối ưu hơn thì hãy chia sẻ nhé <3
