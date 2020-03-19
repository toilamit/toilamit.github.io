How To Select The nth Highest Record In MySQL

Trong bài viết này sẽ hướng dẫn bạn cách lấy bản ghi thứ n cao nhất trong bảng dữ liệu.

Nếu yêu cầu lấy bản ghi cao nhất hoặc thấp nhất thì rất đơn giản chỉ cần sử dụng hàm `MAX` hoặc `MIN`. Vậy nếu chỉ lấy bản ghi thứ n cao nhất thì sao? Ví dụ như lấy sản phẩm có giá cao nhất thứ 3 trong bảng `products` thì sao nhỉ?

Đơn giản thôi, chỉ cần làm theo các bước sau:

- Lấy bản ghi cao nhất thứ n và sắp xếp tăng dần. Khi ấy bản ghi cao nhất là bản ghi cuối cùng.
- Rồi sắp xếp các bản ghi trả về ở trên giảm dần sau đó lấy bản ghi đầu tiên.

Thứ tự thực hiện như các query dưới đây:

```sql
SELECT 
    *
FROM
    table_name
ORDER BY column_name ASC
LIMIT N;
```
Query để lấy bản ghi cao nhất thứ n:

```sql
SELECT 
    *
FROM
    (SELECT 
        *
    FROM
        table_name
    ORDER BY column_name ASC
    LIMIT N) AS tbl
ORDER BY column_name DESC
LIMIT 1;
```
May mắn là trong MySQL cho phép chúng ta sử dụng `LIMIT` để ép buộc trả về số dòng trong các kết quả. Ta có thể viết lại query trên một cách ngắn gọn hơn:

```sql
SELECT 
    *
FROM
    table_name
ORDER BY column_name DESC
LIMIT n - 1, 1;
```
Query trả về dòng đầu tiên của `n-1` --> đó chính là bản ghi cao nhất thứ n.

## Ví dụ lấy bản ghi cao nhất thứ n
Ví dụ lấy sản phẩm thứ 2 đắt nhất (n = 2) trong bảng `products`:

```sql
SELECT 
    productCode, productName, buyPrice
FROM
    products
ORDER BY buyPrice DESC
LIMIT 1 , 1;
```

![MySQL nth Highest Example](/wp-content/uploads/2019/08/MySQL-nth-Highest-Example.jpg)

Cách thứ 2 để lấy bản ghi cao nhất thứ n là sử dụng MySQL subquery:

```sql
SELECT *
FROM table_name AS a 
WHERE n - 1 = (
 SELECT COUNT(primary_key_column) 
 FROM products b 
 WHERE  b.column_name > a. column_name)
```
Kết quả tương tự cách đầu tiên:

```sql
SELECT 
    productCode, productName, buyPrice
FROM
    products a
WHERE
    1 = (SELECT 
            COUNT(productCode)
        FROM
            products b
        WHERE
            b.buyPrice > a.buyPrice);
```
