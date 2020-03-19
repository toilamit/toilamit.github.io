MySQL Reset Auto Increment Values

Bài viết này sẽ hướng dẫn bạn cách thiết lập lại giá trị auto-increment của cột AUTO_INCREMENT trong MySQL

Trong MySQL có một tính năng hữu ích gọi là auto-increment. Bạn có thể gán thuộc tính AUTO_INCREMENT cho một column để tạo ra một giá trị unique cho mỗi row. Điển hình việc sử dụng AUTO_INCREMENT cho cột primary key.

Bất cứ khi nào tạo một dòng mới thì MySQL sẽ tự động gán một giá trị theo thứ tự cho cột AUTO_INCREMENT.

Ví dụ nếu bảng có 8 dòng, và bạn thêm mới 1 dòng mà không cần chỉ rõ giá trị của cột auto-increment thì MySQLsẽ tự động thêm vào dòng mới với id là 9.

Có lúc bạn cần phải thiết lập lại giá trị của cột auto-increment thì định danh của bản ghi đầu tiên mà bạn thêm vào sẽ bắt đầu từ số mà bạn đã chỉ ra. Ví dụ là 1

Có một số cách để thiết lập lại giá trị auto-increment như dưới đây:

## Ví dụ thiết lập lại giá trị auto-increment
Hãy tạo 1 bảng như dưới đây

```sql
CREATE TABLE tmp (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) DEFAULT NULL,
  PRIMARY KEY (id)
);
```
Thêm 1 vài bản ghi để test

```sql
INSERT INTO tmp(name)
VALUES('test 1'),
      ('test 2'),
      ('test 3');
```
Kiểm tra dữ liệu

```sql
SELECT 
    *
FROM
    tmp;
```
![MySQL Reset Auto-Increment Value](http://www.mysqltutorial.org/wp-content/uploads/2012/12/MySQL-Reset-Auto-Increment-Value.jpg)

## Sử dụng lệnh ALTER TABLE

```sql
ALTER TABLE table_name AUTO_INCREMENT = value;
```
Chú ý là `value` là số lớn hơn hoặc bằng giá trị tối đa của cột auto-increment

Giả sử xóa bản ghi với id=3

```sql
DELETE FROM tmp 
WHERE
    ID = 3;
```
Nếu bây giờ thêm mới bản ghi thì id được gán là 4, tuy nhiên ta có thể khôi phục lại giá trị auto-increment là 3 theo lệnh:

```sql
ALTER TABLE tmp AUTO_INCREMENT = 3;
```
Hãy thử insert bản ghi mới xem:

```sql
INSERT INTO tmp(name)
VALUES ('MySQL example 3');
 
SELECT 
    *
FROM
    tmp;
```
![MySQL Reset Auto-Increment Value Example](http://www.mysqltutorial.org/wp-content/uploads/2018/08/MySQL-Reset-Auto-Increment-Value-Example.png)

Well done! Không phải là id=4 mà là 3 nhé.

## Sử dụng lệnh TRUNCATE TABLE
The TRUNCATE TABLE statement removes all the data from a table and resets the auto-increment value to zero.

The following illustrates the syntax of the TRUNCATE TABLE  statement:

```sql
TRUNCATE TABLE table_name;
```
Khi sử dụng lệnh này thì sẽ xóa toàn bộ dữ liệu của bảng và thiết lập lại giá trị auto-increment từ đầu.

## Sử dụng lệnh DROP  TABLE và CREATE TABLE
Cặp `DROP TABLE` và `CREATE TABLE` có thể thiết lập lại giá trị auto-increment và đồng thời xóa luôn dữ liệu của bảng.

```sql
DROP TABLE table_name;
CREATE TABLE table_name(...);
```

Trên đây là 1 số cách để khôi phục lại giá trị ban đầu của auto-increment, bạn có thể sử dụng tùy vào trường hợp của mình. Cách đầu tiên là có thể tốt nhất vì nó dễ dàng nhất và không có sự ảnh hưởng gì về dữ liệu.
