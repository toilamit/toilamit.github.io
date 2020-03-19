## Giới thiệu MySQL CTE

Bài viết này hướng dẫn cách sử dụng MySQL common table expression (MySQL CTE) để xây dựng các queries phức tạp theo một cách dễ đọc hơn.

> Tính năng common table expression (CTE) được sử dụng từ version 8.0. Vì vậy các bạn nên cài đặt MySQL 8.0 để thực hiện theo bài viết này

### Common table expression (CTE) là gì?

Một common table expression hay CTE là kết quả tạm thời được đặt tên và chỉ tồn tại trong phạm vi thực thi một câu lệnh như: `SELECT`, `INSERT`, `UPDATE` hoặc `DELETE`.

Giống như với Derived Table, CTE không được lưu như 1 object mà chỉ tồn tại trong suốt quá trình thực thi truy vấn.

Khác với Derived Table, CTE có thể tự tham chiếu (CTE đệ qui) hoặc có thể được tham chiếu nhiều lần trong cùng 1 truy vấn. Ngoài ra, CTE cung cấp khả năng đọc và hiệu suất tốt hơn so với Derived Table.

### Cú pháp MySQL CTE
Cấu trúc của CTE bao gồm:
- name
- danh sách optional column
- truy vấn xác định CTE

Sau khi CTE được định nghĩa, ta có thể sử dụng nó như 1 `view` trong các lệnh `SELECT`, `INSERT`, `UPDATE`, `DELETE` hoặc `CREATE VIEW`.

Basic syntax của CTE:

```sql
WITH cte_name (column_list) AS (
    query
) 
SELECT * FROM cte_name;
```

Lưu ý rằng, số lượng columns trong query phải bằng với số columns trong `column_list`. Nếu không sử dụng `column_list`, CTE sẽ sử dụng column list của query đã định nghĩa CTE.

### Simple MySQL CTE examples

Ví dụ sau chỉ ra cách sử dụng CTE để truy vấn dữ liệu từ bảng `customers`, các bạn có thể [download database sample tại đây](https://toilamit.com/2019/05/23/download-mysql-sample-database/).

#### Ví dụ 1:

```sql
WITH customers_in_usa AS (
    SELECT 
        customerName, state
    FROM
        customers
    WHERE
        country = 'USA'
) SELECT 
    customerName, state
 FROM
    customers_in_usa
 WHERE
    state = 'CA'
 ORDER BY customerName;
```

![MySQL CTE Example 1](https://toilamit.com/wp-content/uploads/2019/05/MySQL-CTE-Example-1.png)

Trong ví dụ này, CTE là `customers_in_usa`, trong truy vấn CTE trả về 2 column `customerName` và `state` cùng với điều kiện là tất cả customers ở USA.

Sau khi CTE được định nghĩa, chúng ta sẽ tham chiếu nó vào câu lệnh `SELECT` để chỉ chọn các customers ở bang California mà thôi.


#### Ví dụ 2:

```sql
WITH topsales2003 AS (
    SELECT 
        salesRepEmployeeNumber employeeNumber,
        SUM(quantityOrdered * priceEach) sales
    FROM
        orders
            INNER JOIN
        orderdetails USING (orderNumber)
            INNER JOIN
        customers USING (customerNumber)
    WHERE
        YEAR(shippedDate) = 2003
            AND status = 'Shipped'
    GROUP BY salesRepEmployeeNumber
    ORDER BY sales DESC
    LIMIT 5
)
SELECT 
    employeeNumber, firstName, lastName, sales
FROM
    employees
        JOIN
    topsales2003 USING (employeeNumber);
```

![MySQL CTE Example 2](https://toilamit.com/wp-content/uploads/2019/05/MySQL-CTE-Example-2.png)

Trong ví dụ này, CTE `topsales2003` sẽ trả về top 5 sales trong năm 2003. Sau đó, tham chiếu CTE để lấy thông tin về sales bao gồm cả first và last name.

#### Ví dụ 3:

```sql
WITH salesrep AS (
    SELECT 
        employeeNumber,
        CONCAT(firstName, ' ', lastName) AS salesrepName
    FROM
        employees
    WHERE
        jobTitle = 'Sales Rep'
),
customer_salesrep AS (
    SELECT 
        customerName, salesrepName
    FROM
        customers
            INNER JOIN
        salesrep ON employeeNumber = salesrepEmployeeNumber
)
SELECT 
    *
FROM
    customer_salesrep
ORDER BY customerName;
```

![MySQL CTE Example 3](https://toilamit.com/wp-content/uploads/2019/05/MySQL-CTE-Example-3.png)

Ở ví dụ này, 2 CTEs đước sử dụng. CTE đầu tiên (`salesrep`) lấy các nhân viên với jobTitle là 'Sales Rep'. CTE thứ 2 (`customer_salesrep`) tham chiếu tới CTE `salesrep` trong lệnh `INNER JOIN` để lấy sales rep và customers tương ứng của mỗi sales rep đứng ra chịu trách nhiệm.

Sau đó tham chiếu tới CTE thứ 2 để lấy dữ liệu có sử dụng lệnh `ORDER BY`

### WITH clause usages

Một số trường hợp sử dụng WITH để tạo CTE:

#### 1. `WITH` được sử dụng khi bắt đầu lệnh `SELECT`, `UPDATE` hoặc `DELETE`.

```sql
WITH ... SELECT ...
WITH ... UPDATE ...
WITH ... DELETE ...
```
#### 2. `WITH` được sử dụng khi bắt đầu subquery hoặc derived table subquery.

```sql
SELECT ... WHERE id IN (WITH ... SELECT ...);
 
SELECT * FROM (WITH ... SELECT ...) AS derived_table;
```

#### 3. `WITH` được sử dụng ngay trước khi `SELECT` bao gồm cả lệnh `SELECT`.

```sql
CREATE TABLE ... WITH ... SELECT ...
CREATE VIEW ... WITH ... SELECT ...
INSERT ... WITH ... SELECT ...
REPLACE ... WITH ... SELECT ...
DECLARE CURSOR ... WITH ... SELECT ...
EXPLAIN ... WITH ... SELECT ...
```

Hi vọng bài viết này sẽ giúp các bạn hiểu rõ hơn về cách dùng MySQL CTE.

Hãy like, share & comment để cùng học nhé!
