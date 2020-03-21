---
layout: post
title: How To Compare Successive Rows Within The Same Table in MySQL
categories: [MySQL]
date: 2019-07-22 09:00:00 +0700
description: 
img: # Add image post ex: viet-dep-zai.jpg (optional)
fig-caption: # Add figcaption (optional)
tags: [mysql, mysql successive rows]
---

Bài viết sẽ hướng dẫn cách so sánh các rows liên tiếp nhau trong cùng 1 table sử dụng kỹ thuật `self-join`

Giả sử bạn có một bảng `inventory` với cấu trúc như dưới

```sql
CREATE TABLE inventory(
  id INT AUTO_INCREMENT PRIMARY KEY,
  counted_date date NOT NULL,
  item_no VARCHAR(20) NOT NULL,
  qty int(11) NOT NULL
);
```

Trong đó:

- `id` là cột tự tăng.
- `counted_date` là ngày được đếm.
- `item_no` là mã item được lưu vào bảng.
- `qty` là số lượng tích lũy.

Chúng ta sẽ thêm một số dữ liệu

```sql
INSERT INTO inventory(counted_date,item_no,qty)
VALUES ('2014-10-01','A',20),
    ('2014-10-01','A',30),
    ('2014-10-01','A',45),
    ('2014-10-01','A',80),
    ('2014-10-01','A',100);
```

![MySQL Compare Successive Rows](/wp-content/uploads/2019/07/MySQL-Compare-Successive-Rows.jpg)

Nếu bạn muốn biết bao nhiêu items được nhận trong ngày cho mỗi item thì bạn cần so sánh số lượng có sẵn của một ngày cụ thể với ngày trước đó.

Nói cách khác là chúng ta cần so sánh một row với row liên tiếp của nó để tìm ra sự khác biệt.

Trong MySQL, bạn có thể sử dụng kỹ thuật self-join để so sánh các row liên tiếp:

```sql
SELECT 
    g1.item_no,
    g1.counted_date from_date,
    g2.counted_date to_date,
    (g2.qty - g1.qty) AS receipt_qty
FROM
    inventory g1
        INNER JOIN
    inventory g2 ON g2.id = g1.id + 1
WHERE
    g1.item_no = 'A';
```

![MySQL successive rows example](/wp-content/uploads/2019/07/MySQL-successive-rows-example.jpg)

Điều kiện trong mệnh đề `INNER JOIN` - `g2.id = g1.id + 1` sẽ so sánh row hiện tại với row kế tiếp, với điều kiện là không có row rỗng giữa các row với nhau.

Trong trường hợp vẫn có các row rỗng xen kẽ thì bạn có thể tạo cột bổ sung, ví dụ `seq` để duy trì tuần tự của các rows và sau đó áp dụng kỹ thuật này bình thường.
