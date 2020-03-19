How To Copy a MySQL Database

Ở bài viết trước hướng dẫn các bạn cách [sao chép dữ liệu của bảng](/2019/06/13/sao-chep-du-lieu-bang-trong-mysql/). Trong bài viết này sẽ hướng dẫn các bạn sao chép database trong cùng 1 server hoặc từ 2 server khác nhau.

## Sao chép database trong cùng server
Các bước để sao chép database:

1. Tạo mới database bằng lệnh `CREATE DATABASE`
2. Sử dụng `mysqldump` để xuất toàn bộ dữ liệu của database mà bạn muốn sao chép.
3. Import file SQL đã xuất ở bước 2 vào database mới.

Ví dụ, chúng ta sao chép database `classicmodels` vào database mới `classicmodels_backup`.

### Bước 1. Tạo mới database `classmodels_backup`:

Trước tiên cần truy cập vào MySQL database server:

```
>mysql -u root -p
Enter password: **********
```
Sau đó tạo database:

```sql
> CREATE DATABASE classicmodels_backup;
```
Xem lại danh sách database cho chắc:

```sql
> SHOW DATABASES
```
Kết quả:

```
+----------------------+
| Database             |
+----------------------+
| classicmodels        |
| classicmodels_backup |
| information_schema   |
| mysql                |
| performance_schema   |
| sys                  |
+----------------------+
6 rows in set (0.00 sec)
```
### Bước 2: Sử dụng `mysqldump` để xuất dữ liệu
Giả sử bạn muốn xuất dữ liệu database `classicmodels` ra 1 file SQL và lưu tại thư mục `D:\db`:

```
>mysqldump -u root -p classicmodels > d:\db\classicmodels.sql
Enter password: **********
```
Chú ý: Dấu `>` để chỉ export.

### Bước 3: Import file `d:\db\classicmodels.sql` vào database classicmodels_backup.

```
>mysql -u root -p classicmodels_backup < d:\db\classicmodels.sql
Enter password: **********
```
Chú ý: Dấu `<` để chỉ import.

Kiểm tra lại các bảng trong database `classicmodels_backup`.

```
> SHOW TABLES FROM classicmodels_backup;
```
Kết quả:

```
+--------------------------------+
| Tables_in_classicmodels_backup |
+--------------------------------+
| customers                      |
| employees                      |
| offices                        |
| orderdetails                   |
| orders                         |
| payments                       |
| productlines                   |
| products                       |
+--------------------------------+
8 rows in set (0.01 sec)
```

## Sao chép database từ 2 server khác nhau
Các bước thực hiện:

1. Export database từ server nguồn vào 1 file SQL.
2. Sao chép SQL file ở bước 1 sang server đích.
3. Import SQL file vào server đích.

Ví dụ thực hiện sao chép database `classicmodels` sang server khác.

### Bước 1: Export database `classicmodels` ra file `db.sql`.

```
>mysqldump -u root -p --databases classicmodels > d:\db\db.sql
Enter password: **********
```
Chú ý option `--database` cho phép chạy đồng thời 2 lệnh `CREATE DATABASE` và `USE`.

Hai lệnh sau tương đương với option `--database`

```sql
CREATE DATABASE `classicmodels`.
 
USE `classicmodels`;
```
### Bước 2: Giả sử file SQL `db.sql` được copy vào thư mục `c:\tmp\` của server đích.

### Bước 3: Import file SQL

```
>mysql -u root -p classicmodels < c:\tmp\db.sql
```
Bài viết hướng dẫn sử dụng công cụ `mysqldump` để xuất dữ liệu database. Hi vọng bài viết hữu ích cho bác bạn.

Hãy like, share và comment để cùng nhau học tập nhé.