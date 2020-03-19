MySQL UUID Smackdown: UUID vs. INT for Primary Key

Bài viết này sẽ giới thiệu bạn về MySQL UUID, và hướng dẫn sử dụng nó như là primary key (PK), và trình bày về pros và cons trong việc sử dụng nó như primary key.

### Giới thiệu MySQL UUID
Định danh duy nhất - Universally Unique IDentifier (UUID) được định nghĩa dựa trên [RFC 4122](https://tools.ietf.org/html/rfc4122), “a Universally Unique Identifier (UUID) URN Namespace).

UUDI là số duy nhất trên toàn cầu về mặt không gian và thời gian. 2 UUID là khác biệt nhau ngay cả khi được tạo ra từ 2 máy chủ riêng biệt.

Trong MySQL, UUID là 1 số dài 128-bit được biểu diễn dưới dạng chuỗi utf8 gồm 5 số thập lục phân theo định dạng sau:
```
aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee
```
Để tạo ra giá trị UUID, bạn sử dụng hàm `UUID()` như sau:
```sql
UUID()
```
Hàm `UUID()` trả về giá trị UUID tuân thủ theo UUID version 1 được mô tả trong RFC 4122.

Ví dụ:

```sql
mysql> SELECT UUID();
+--------------------------------------+
| uuid()                               |
+--------------------------------------+
| 865234ad-6a92-11e7-8846-b05adad3f0ae |
+--------------------------------------+
1 row in set (0.05 sec)
```

### MySQL UUID vs. Auto-Increment INT như primary key
#### Pros
Một số ưu điểm của UUID:

- Vì là giá trị duy nhất trong tables, databases hay thậm chí là các servers khác nhau cho nên sẽ dễ dàng merge dữ liệu từ các databases khác nhau mà không sợ trùng id.
- UUID không đi kèm với thông tin dữ liệu nên sẽ an toàn trên url. Ví dụ, nếu 1 user có id là 10 và truy cập theo link http://www.example.com/customers/10/, từ đó người dùng dễ đoán được các user khác bằng việc thay 10 thành 11, 12, ... việc này dễ bị hacker tấn công.
- UUID có thể được tạo ở mọi nơi tránh ảnh hưởng tới việc xoay vòng database server. Nó cũng đơn giản hóa logic trong ứng dụng. Ví dụ: để thêm dữ liệu vào bảng parent và bảng child, bạn phải thêm dữ liệu vào bảng parent trước, và tạo id và thêm dữ liệu vào bảng child. Bằng việc sử dụng UUID, bạn có thể tạo primary key của bảng parent trước và thêm dữ liệu vào cả 2 bảng parent và child trong cùng 1 transaction.

#### Cons
Một số nhược điểm của UUID:

- UUID chiếm 16-bytes trong khi kiểu INT chiếm 4-bytes hoặc BIGINT chiếm8-bytes.
- Có vẻ khó debug, tưởng tượng lệnh `WHERE id = 'df3b7cb7-6a95-11e7-8846-b05adad3f0ae'` với `WHERE id = 10`
- Vì không được sắp xếp thứ tự và kích thước lớn dẫn đến hiệu năng thấp.

### MySQL UUID solution
Trong MySQL, bạn có thể lưu UUID định dạng BINARY và hiển thị ra dạng VARCHAR bằng một số các hàm sau:

- `UUID_TO_BIN`
- `BIN_TO_UUID`
- `IS_UUID`

>Chú ý rằng các hàm `UUID_TO_BIN()`, `BIN_TO_UUID()`, và `IS_UUID()` chỉ có trên MySQL >= 8.0.

Hàm `UUID_TO_BIN()` chuyển UUID từ dạng VARCHAR sang dạng BINARY để lưu lại và sử dụng hàm `BIN_TO_UUID()` để chuyển UUID từ dạng BINARY sang dạng VARCHAR để hiển thị ra.

Hàm `IS_UUID()` trả về giá trị 1 nếu tham số đúng định dạng chuỗi UUID, ngược lại trả về 0. Trong trường hợp tham số là `NULL`, hàm `IS_UUID()` sẽ trả về `NULL`.

Các UUID sau là hợp lệ trong MySQL:

```sql
aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee
aaaaaaaabbbbccccddddeeeeeeeeeeee
{aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee}
```

### Ví dụ MySQL UUID
Ví dụ sau sử dụng UUID làm primary key.

Trước tiên tạo 1 bảng mới tên `customers`:

```sql
CREATE TABLE customers (
    id BINARY(16) PRIMARY KEY,
    name VARCHAR(255)
);
```
Thêm mới UUID vào cột `id`:

```sql
INSERT INTO customers(id, name)
VALUES(UUID_TO_BIN(UUID()),'John Doe'),
      (UUID_TO_BIN(UUID()),'Will Smith'),
      (UUID_TO_BIN(UUID()),'Mary Jane');
```
Khi truy xuất dữ liệu, sử dụng hàm `BIN_TO_UUID()` để chuyển đổi dạng binary sang dạng human-readable:

```sql
SELECT 
    BIN_TO_UUID(id) id, 
    name
FROM
    customers;
```
![MySQL UUID Example](/wp-content/uploads/2019/06/MySQL-UUID.png)

Như vậy là ngoài cách tạo primary key bằng kiểu INT hay BIGINT, các bạn có thể sử dụng UUID để làm PRIMARY KEY tùy vào mục đích sử dụng dựa vào ưu điểm hay nhược điểm của nó.

Hi vọng bài viết hữu ích cho các bạn. ^^