---
layout: post
title: Giới thiệu và cách sử dụng MySQL Recursive CTE
categories: [MySQL]
date: 2019-05-23 09:00:00 +0700
description: 
img: # Add image post ex: viet-dep-zai.jpg (optional)
fig-caption: # Add figcaption (optional)
tags: [mysql, mysql cte]
---

Bài viết này sẽ giới thiệu và hướng dẫn các bạn cách sử dụng MySQL recursive CTE để duyệt dữ liệu phân cấp.

> Chú ý rằng [common table expression (CTE)]() chỉ được sử dụng từ MySQL phiên bản 8.0. Do đó hãy chắc chắn là bạn cài đúng version của MySQL.

### Introduction to MySQL recursive CTE

recursive common table expression (CTE) là 1 CTE có subquery mà tham chiếu tới chính bản thân CTE đó. Cú pháp của recursive CTE như sau:

```sql
WITH RECURSIVE cte_name AS (
    initial_query  -- anchor member
    UNION ALL
    recursive_query -- recursive member that references to the CTE name
)
SELECT * FROM cte_name;
```

Một recursive CTE gồm 3 phần chính:

- Một initial query tạo ra kết quả dựa theo cấu trúc của CTE và được coi như một anchor member.
- Một recursive query part là một truy vấn tham chiếu tới chính tên của CTE và được gọi là recursive member. Recursive member join với anchor member  bằng toán tử `UNION ALL` hoặc `UNION DISTINCT`.
- Một điều kiện để kết thúc đệ qui khi mà recursive member không trả về row nào cả.

Thứ tự thực thi của một recursive CTE như sau:

1. Đầu tiên, tách biệt members thành 2: anchor và recursive members.
2. Tiếp theo, thực thi anchor member để tạo ra kết quả và thiết lập nó (giả sử là `R0`) và sử dụng kết quả đó cho lặp kế tiếp.
3. Sau đó, thực thi recursive member với đầu vào là  `Ri` và tạo ra kết quả là `Ri+1`.
4. Tiếp sau đó, lặp lại bước thứ 3 tới khi recursive member trả về kết quả rỗng và khi đó điều kiện kết thúc sẽ được áp dụng.
5. Cuối cùng, kết hợp các kết quả từ `R0` tới `Rn` sử dụng `UNION ALL`.

### Hạn chế của Recursive member

Recursive member bắt buộc không gồm các thành phần sau:

- Các hàm tính trung bình như: `MAX`, `MIN`, `SUM`, `AVG`, `COUNT`, ...
- `GROUP BY`
- `ORDER BY`
- `LIMIT`
- `DISTINCT`

Các ràng buộc trên không áp dụng cho anchor member. Ngoài ra `DISTINCT` sẽ không được phép sử dụng khi bạn dùng `UNION`, còn trong trường hợp bạn dùng `UNION DISTINCT` thì `DISTINCT` được phép sử dụng.

Ngoải ra, recursive member chỉ có thể tham chiếu tới CTE một lần và từ mệnh đề `FROM` chứ không phải từ subquery.

### Simple MySQL recursive CTE example

See the following simple recursive CTE example:

```sql
WITH RECURSIVE cte_count (n) 
AS (
      SELECT 1
      UNION ALL
      SELECT n + 1 
      FROM cte_count 
      WHERE n < 3
    )
SELECT n 
FROM cte_count;
```

Ở ví dụ này, để ý truy vấn:

```sql
SELECT 1
```

là 1 anchor member trả về giá trị 1 và được set là kết quả ban đầu.

Truy vấn

```sql
SELECT n + 1
FROM cte_count 
WHERE n < 3
```

là recursive member vì nó tham chiếu tới tên của CTE là `cte_count`.

Biểu thức `n < 3` trong recursive member là điều kiện để kết thúc lặp đệ quy. Nếu `n = 3` thì recursive member trả về một tập hợp rỗng và sẽ dừng đệ quy.

Mô tả các thành phần của CTE ở trên:

![MySQL Recursive CTE](https://toilamit.com/wp-content/uploads/2019/05/MySQL-Recursive-CTE.png)

Kết quả:

![MySQL Recursive CTE Example](https://toilamit.com/wp-content/uploads/2019/05/MySQL-Recursive-CTE-Example.png)

Các bước thực thi recursive CTE như sau:

1. Đầu tiên, phân tách anchor và recursive members.
2. Tiếp, anchor member tạo ra row ban đầu (`SELECT 1`) do đó vòng lặp đầu tiên tạo ra 1 + 1 = 2 với n = 1.
3. Sau đó, vòng lặp thứ 2 thực hiện trên kết quả của vòng lặp thứ nhất (2) và tạo ra 2 + 1 = 3 với n = 2.
4. Sau đó, trước khi vòng lặp thứ 3 thực hiện (n = 3) thì nó đã kiểm tra điều kiện kết thúc (n < 3) do đó vòng lặp kết thúc.
5. Cuối cùng, kết hợp tất cả các kết quả 1,2 và 3 với toán tử `UNION ALL`.

### Sử dụng MySQL recursive CTE để duyệt dữ liệu phân cấp

Chúng ta sẽ sử dụng bảng `employees` trong database `classicmodels` cho ví dụ này:

![Employees Table](https://toilamit.com/wp-content/uploads/2019/05/employees_table.png)

Bảng `employees` có cột `reportsTo` tham chiếu tới cột `employeeNumber`. Cột `reportsTo` lưu các id của các quản lý. Top manager không phải báo cáo cho bất kỳ ai cho nên giá trị `reportsTo` là `NULL`.

Bạn có thể áp dụng recursive CTE để truy vấn toàn bộ cấu trúc của tổ chức theo cách từ trên xuống như sau:

```sql
WITH RECURSIVE employee_paths AS
  ( SELECT employeeNumber,
           reportsTo managerNumber,
           officeCode, 
           1 lvl
   FROM employees
   WHERE reportsTo IS NULL
     UNION ALL
     SELECT e.employeeNumber,
            e.reportsTo,
            e.officeCode,
            lvl+1
     FROM employees e
     INNER JOIN employee_paths ep ON ep.employeeNumber = e.reportsTo )
SELECT employeeNumber,
       managerNumber,
       lvl,
       city
FROM employee_paths ep
INNER JOIN offices o USING (officeCode)
ORDER BY lvl, city;
```

Để dễ hiểu hơn, ta sẽ chia nhỏ các truy vấn ra.

Đầu tiên, tạo ra anchor member:

```sql
SELECT 
    employeeNumber, reportsTo managerNumber, officeCode
FROM
    employees
WHERE
    reportsTo IS NULL
```

Câu truy vấn này (anchor member) trả về top manager với `reportsTo` is `NULL`.

Thứ 2, tạo ra recursive member (`employee_paths`) bằng việc tham chiếu tới CTE:

```sql
SELECT 
    e.employeeNumber, e.reportsTo, e.officeCode
FROM
    employees e
        INNER JOIN
    employee_paths ep ON ep.employeeNumber = e.reportsTo
```

Truy vấn này ( recursive member) trả về tất cả các báo cáo trực tiếp của manager tới khi không còn báo cáo trực tiếp nữa. Khi đó recursion sẽ dừng lại.

Thứ 3, CTE `employee_paths` kết hợp tập kết quả được trả về bởi CTE với bảng `offices` để tạo ra tập kết quả cuối cùng.

Kết quả:

![MySQL Recursive CTE Hierarchical Data Traversal](https://toilamit.com/wp-content/uploads/2019/05/MySQL-Recursive-CTE-Hierarchical-Data-Traversal.png)

Các bạn đã hiểu về Recursive CTE chưa? Hãy like share và comment để cùng học hỏi nhé.