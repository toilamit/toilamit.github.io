MySQL Copy Table With Examples

Bài viết này sẽ hướng dẫn các bạn sao chép các bảng trong cùng 1 database hoặc từ 2 database khác nhau sử dụng `CREATE TABLE` và `SELECT`.

## MySQL copy table sang 1 table mới
Sao chép dữ liệu từ 1 bảng sang 1 bảng mới rất có ích trong 1 số trường hợp như là sao lưu dữ liệu và tạo bản sao của dữ liệu production cho mục đích testing.

Sử dụng `CREATE TABLE` và `SELECT` để thực hiện copy

```sql
CREATE TABLE new_table 
SELECT col, col2, col3 
FROM
    existing_table;
```
Đầu tiên MySQL sẽ tạo mới 1 bảng với tên mới với lệnh `CREATE TABLE`. Cấu trúc của bảng mới sẽ được định nghĩa bởi tập kết quả của lệnh `SELECT`. Sau đó MySQL sẽ đưa các dữ liệu có được từ lệnh `SELECT` vào bảng mới.

Nếu bạn chỉ muốn sao chép 1 phần dữ liệu thì có thể sử dụng `WHERE` trong câu lệnh `SELECT`:

```sql
CREATE TABLE new_table 
SELECT col1, col2, col3 
FROM
    existing_table
WHERE
    conditions;
```
Một điều quan trọng là trước khi tạo mới bảng, bạn cần kiểm tra sự tồn tại của bảng. Bạn sử dụng `IF NOT EXIST` để kiểm tra và tạo mới bảng.

```sql
CREATE TABLE IF NOT EXISTS new_table 
SELECT col1, col2, col3 
FROM
    existing_table
WHERE
    conditions;
```
Lưu ý rằng lệnh trên chỉ sao chép dữ liệu. Nó không sao chép các đối tượng database khác của bảng như: indexes, primary key constraint, foreign key constraints, triggers, ...

Để sao chép toàn bộ bảng gồm dữ liệu và các đối tượng liên quan bạn sử dụng lệnh sau:

```sql
CREATE TABLE IF NOT EXISTS new_table LIKE existing_table;
 
INSERT new_table
SELECT * FROM existing_table;
```
Câu lệnh đầu tiên tạo mới bảng `new_table` bằng cách nhân đôi `existing_table`. Câu lệnh thứ 2 chèn dữ liệu từ bảng `existing_table` vào bảng `new_table`.

## Ví dụ về sao chép bảng trong MySQL
Lệnh sau sẽ sao chép dữ liệu từ bảng `offices` sang bảng mới tên là `offices_bk` trong database mẫu `classicmodels`. Các bạn có thể download tại [đây](/2019/05/23/download-mysql-sample-database/)

```sql
CREATE TABLE IF NOT EXISTS offices_bk 
SELECT * FROM
    offices;
```
Kiểm tra lại dữ liệu đã sao chép:

```sql
SELECT
    *
FROM
    offices_bk;
```
![MySQL COPY TABLE example](/wp-content/uploads/2019/06/MySQL-COPY-TABLE-example.jpg)

Trường hợp bạn chỉ muốn copy dữ liệu của US, bạn sử dụng lệnh sau:

```sql
CREATE TABLE IF NOT EXISTS offices_usa 
SELECT * 
FROM
    offices
WHERE
    country = 'USA'
```
Kiểm tra dữ liệu từ bảng `offices_usa`.

```sql
SELECT 
    *
FROM
    offices_usa;
```
![MySQL COPY TABLE copy partial data example](/wp-content/uploads/2019/06/MySQL-COPY-TABLE-copy-partial-data-example.jpg)

Giả sử, bạn muốn sao chép dữ liệu và các đối tượng của bảng thì bạn sử dụng lệnh.

```sql
CREATE TABLE offices_dup LIKE offices;
 
INSERT office_dup
SELECT * FROM offices;
```
## Sao chép bảng sang 1 database khác
Để sao chép bảng từ 1 database này sang 1 database khác bạn dùng lệnh sau:

```sql
CREATE TABLE destination_db.new_table 
LIKE source_db.existing_table;
 
INSERT destination_db.new_table 
SELECT *
FROM source_db.existing_table;
```
Lệnh đầu tiên tạo mới bảng `new_table` từ database đích (`destination_db`) bằng việc nhân đôi bảng đã có (`existing_table`) từ database nguồn (`source_db`).

Lệnh thứ 2 sao chép dữ liệu từ bảng đã có trong database nguồn sang bảng mới trong database đích.

Hãy xem ví dụ sau:

1. Tạo mới database tên `testdb`

```sql
CREATE DATABASE IF NOT EXISTS testdb;
```
2. Tạo bảng `offices` trong `testdb` và sao chép cấu trúc từ bảng `offices`trong database classicmodels

```sql
CREATE TABLE testdb.offices LIKE classicmodels.offices;
```
3. Sao chép dữ liệu

```sql
INSERT testdb.offices
SELECT *
FROM classicmodels.offices;
```
Kiểm tra dữ liệu trong bảng `testdb.offices`.

```sql
SELECT
    *
FROM
    testdb.offices;
```
![MySQL COPY TABLE example](/wp-content/uploads/2019/06/MySQL-COPY-TABLE-example.jpg)

Well done! Như vậy là các bạn đã biết cách sao chép dữ liệu của bảng cho nhiều mục đích khác nhau. Hi vọng bài viết giúp ích cho bạn. 

Like share và comment để cùng nhau tiến bộ nhé.