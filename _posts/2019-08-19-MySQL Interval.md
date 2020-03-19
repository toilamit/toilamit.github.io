---
layout: post
title: Tìm hiểu về MySQL Interval
permalink: /mysql/mysql-interval
date: 2019-09-12 09:00:00 +0700
description: 
img: # Add image post ex: viet-dep-zai.jpg (optional)
fig-caption: # Add figcaption (optional)
tags: [mysql, mysql interval]
---

Bài viết này sẽ hướng dẫn bạn cách dùng interval value để thực hiện tính toán với date và time.

## Giới thiệu về MySQL interval values
MySQL interval values được sử dụng chính để tính toán date và time. Cách dùng như biểu thức sau:

```sql
INTERVAL expr unit
```
Theo sau từ khóa `INTERVAL` là `expr` xác định khoảng giá trị, và `unit` chỉ là khoảng đơn vị. Ví dụ, để tạo ra khoảng 1-day, ta có thể sử dụng biểu thức sau:

```sql
INTERVAL 1 DAY
```
Chú ý là cả `INTERVAL` và `UNIT` là không phân biệt hoa thường nên lệnh sau là tương đương.

```sql
interval 1 day
```
Chúng ta phần lớn sử dụng interval value cho date và time giống như biểu thức dưới đây:

```sql
date + INTERVAL expr unit
date - INTERVAL expr unit
```
Interval value cũng được sử dụng trong phần lớn các hàm liên quan tới thời gian như `DATE_ADD,DATE_SUB, TIMESTAMPADD` và `TIMESTAMPDIFF`.

Định dạng chuẩn cho `expr` và `unit` được mô tả trong bảng dưới:

| unit | expr |
|---|---|
| DAY | DAYS |
| DAY_HOUR | ‘DAYS HOURS’ |
| DAY_MICROSECOND | ‘DAYS HOURS:MINUTES:SECONDS.MICROSECONDS’ |
| DAY_MINUTE | ‘DAYS HOURS:MINUTES’ |
| DAY_SECOND | ‘DAYS HOURS:MINUTES:SECONDS’ |
| HOUR | HOURS |
| HOUR_MICROSECOND | ‘HOURS:MINUTES:SECONDS.MICROSECONDS’ |
| HOUR_MINUTE | ‘HOURS:MINUTES’ |
| HOUR_SECOND | ‘HOURS:MINUTES:SECONDS’ |
| MICROSECOND MICROSECONDS |
| MINUTE | MINUTES |
| MINUTE_MICROSECOND | ‘MINUTES:SECONDS.MICROSECONDS’ |
| MINUTE_SECOND | ‘MINUTES:SECONDS’ |
| MONTH | MONTHS |
| QUARTER | QUARTERS |
| SECOND | SECONDS |
| SECOND_MICROSECOND | ‘SECONDS.MICROSECONDS’ |
| WEEK | WEEKS |
| YEAR | YEARS |
| YEAR_MONTH | ‘YEARS-MONTHS’ |

## Các ví dụ MySQL interval
Truy vấn sau sẽ cộng thêm 1 ngày vào ngày đã select.

```sql
 SELECT '2020-01-01' + INTERVAL 1 DAY;
+-------------------------------+
| '2020-01-01' + INTERVAL 1 DAY |
+-------------------------------+
| 2020-01-02                    |
+-------------------------------+
1 row in set (0.01 sec)
```

Bạn cũng có thể sử dụng 1 số âm cho phần `expr` như ví dụ dưới:

```sql
SELECT '2020-01-01' + INTERVAL -1 DAY;
+--------------------------------+
| '2020-01-01' + INTERVAL -1 DAY |
+--------------------------------+
| 2019-12-31                     |
+--------------------------------+
1 row in set (0.00 sec) 
```
Truy vấn dưới đây sử dụng `DATE_ADD` và `DATE_SUB` để thêm/bớt 1 tháng:

```sql
SELECT DATE_ADD('2020-01-01', INTERVAL 1 MONTH) 1_MONTH_LATER, 
       DATE_SUB('2020-01-01',INTERVAL 1 MONTH) 1_MONTH_BEFORE;
+---------------+----------------+
| 1_MONTH_LATER | 1_MONTH_BEFORE |
+---------------+----------------+
| 2020-02-01    | 2019-12-01     |
+---------------+----------------+
1 row in set (0.00 sec)
```
Truy vấn sau dùng hàm `TIMESTAMPADD(unit,interval,expression)` để thêm vào 30 phút:

```sql
SELECT TIMESTAMPADD(MINUTE,30,'2020-01-01') 30_MINUTES_LATER;
+---------------------+
| 30_MINUTES_LATER    |
+---------------------+
| 2020-01-01 00:30:00 |
+---------------------+
1 row in set (0.00 sec)
```

## Ví dụ thực hành MySQL interval
Trước tiên tạo 1 bảng `memberships`

```sql
CREATE TABLE memberships (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(355) NOT NULL,
    plan VARCHAR(255) NOT NULL,
    expired_date DATE NOT NULL
);
```
Trong bảng `memberships` cột `expired_date` sẽ lưu ngày hết hạn của mỗi member.

Thêm một số dữ liệu vào bảng `memberships`.

```sql
INSERT INTO memberships(email, plan, expired_date)
VALUES('john.doe@example.com','Gold','2019-08-13'),
      ('jane.smith@example.com','Platinum','2019-08-10'),
      ('david.corp@example.com','Silver','2019-08-15'),
      ('julia.william@example.com','Gold','2019-08-20'),
      ('peter.drucker@example.com','Silver','2019-08-08');
```
![MySQL Interval memberships table](/wp-content/uploads/2019/08/MySQL-Interval-memberships-table.jpg)
Giả sử hôm nay là 2019-08-06 thì bạn có thể tìm các thành viên đã hết hạn trong 7 ngày sử dụng lệnh sau:

```sql
SELECT 
    email,
    plan,
    expired_date,
    DATEDIFF(expired_date, '2019-08-06') remaining_days
FROM
    memberships
WHERE
    '2019-08-06' BETWEEN DATE_SUB(expired_date, INTERVAL 7 DAY) AND expired_date;
```
![MySQL Interval Example](/wp-content/uploads/2019/08/MySQL-Interval-Example.jpg)

Trong truy vấn này, chúng ta sử dụng `DATE_SUB` để trừ ngày hết hạn đi 7 ngày sử dụng interval value (INTERVAL 7 DAY).
