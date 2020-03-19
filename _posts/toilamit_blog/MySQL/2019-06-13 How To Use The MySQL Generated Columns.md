How To Use The MySQL Generated Columns

Bài viết này sẽ hướng dẫn sử dụng `MySQL generated columns` để lưu dữ liệu được tính toán từ 1 biểu thức hoặc các cột khác.

## Giới thiệu MySQL generated column
Khi bạn tạo mới 1 bảng, bạn chỉ rõ các cột của bảng trong lệnh `CREATE TABLE`. Sau đó dùng các lệnh `INSERT`, `UPDATE`, và `DELETE` để sửa đổi trực tiếp dữ liệu trong từng cột của bảng.

Trong MySQL 5.7 giới thiệu 1 tính năng mới gọi là `generated column`. Lý do tên là thế vì dữ liệu trong cột được tính toán dựa vào các biểu thức được định nghĩa từ trước hoặc từ các cột khác.

Ví dụ bảng `contacts` với cấu trúc như sau:

```sql
CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL
);
```
Sử dụng hàm `CONCAT()` lấy tên đầy đủ:

```sql
SELECT 
    id, CONCAT(first_name, ' ', last_name), email
FROM
    contacts;
```
Lệnh này vẫn chưa phải là tốt nhất.

Lệnh sau sử dụng `generated column` để tạo bảng `contacts`:

```sql
DROP TABLE IF EXISTS contacts;
 
CREATE TABLE contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    fullname varchar(101) GENERATED ALWAYS AS (CONCAT(first_name,' ',last_name)),
    email VARCHAR(100) NOT NULL
);
```
Trong đó `GENERATED ALWAYS AS (expression)` là cú pháp để tạo ra 1 `generated column`.

Test lại cột `fullname`

```sql
INSERT INTO contacts(first_name,last_name, email)
VALUES('viet','nguyen','toilamitdotcom@gmail.com');
```

```sql
SELECT 
    *
FROM
    contacts;
```
<!-- ![MySQL generated column - example](http://www.mysqltutorial.org/wp-content/uploads/2013/01/MySQL-generated-column-example.png) -->

Như ở trên thì giá trị cột `fullname` được tính toán dựa trên truy vấn từ bảng `contacts`.

Có 2 loại `generated columns`: stored và virtual. 

- **stored**: được tính toán và lưu vào bộ nhớ vật lý và chỉ tính toán lại khi dữ liệu cập nhật.
- **virtual**: luôn tính toán khi dữ liệu được đọc.

Ở ví dụ trên thì cột `fullname` là cột `virtual`

## Cú pháp của MySQL generated column

```sql
column_name data_type [GENERATED ALWAYS] AS (expression)
   [VIRTUAL | STORED] [UNIQUE [KEY]]
```
MySQL mặc định kiểu generated column là `VIRTUAL`

**expression** có thể gồm literals, built-in functions with no parameters, operators, hoặc tham chiếu tới bất kỳ cột nào trong cùng 1 bảng. Nếu là function thì bắt buộc là scalar và deterministic.

Nếu generated column được lưu thì bạn có thể xác định 1 unique constraint cho nó.

## Ví dụ về MySQL stored column
Chúng ta sẽ sử dụng bảng `products` trong [database mẫu](/2019/05/23/download-mysql-sample-database/) để làm ví dụ.

![products table](/wp-content/uploads/2019/06/products_table.png)

Dữ liệu từ 2 cột `quantityInStock` và `buyPrice` dùng để tính tiền hàng bằng biểu thức.

```sql
quantityInStock * buyPrice
```
Tuy nhiên bạn có thể thêm 1 `stored generated column` với tên là `stock_value` vào bảng `products` sử dụng lệnh `ALTER TABLE ...ADD COLUMN`:

```sql
ALTER TABLE products
ADD COLUMN stockValue DOUBLE 
GENERATED ALWAYS AS (buyprice*quantityinstock) STORED;
```
Thông thường, lệnh `ALTER TABLE` sẽ rebuild lại toàn bộ bảng, do đó sẽ tốn thời gian nếu bạn thay đổi bảng lớn. Tuy nhiên thì đây không phải là trường hợp dành cho `virtual column`.

Bây giờ bạn có thể truy vấn tiền hàng trực tiếp từ bảng `products`.

```sql
SELECT 
    productName, ROUND(stockValue, 2) AS stock_value
FROM
    products;
```
![MySQL generated column](http://www.mysqltutorial.org/wp-content/uploads/2013/01/MySQL-generated-column.png)

Như vậy với generated column sẽ giúp bạn tạo ra các dữ liệu cần thiết mà không cần phải sử dụng nhiều câu query.

Hi vọng bài viết hữu ích cho các bạn.

Hãy like, share và comment để cùng nhau học nhé.