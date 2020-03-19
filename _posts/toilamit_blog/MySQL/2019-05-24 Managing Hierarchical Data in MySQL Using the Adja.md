## Sử dụng Adjacency List Model (ALM) để quản lý dữ liệu phân cấp trong MySQL

Trong bài viết này, chúng ta sẽ học cách sử dụng Adjacency List Model (ALM) để quản lý dữ liệu phân cấp.


## Giới thiệu về Adjacency List Model (ALM)
Như chúng ta biết thì dữ liệu phân cấp ở mọi nơi. Nó có thể là blog categories, phân cấp các sản phẩm hoặc là cấu trúc của tổ chức.

Có nhiều cách để quản lý dữ liệu phân cấp trong MySQL nhưng có lẽ ALM là giải pháp đơn giản nhất. Chính vì sự đơn giản mà ALM là lựa chọn phổ biến bởi hầu hết các developers và các nhà quản trị cơ sở dữ liệu.

Trong ALM, mỗi node có 1 pointer trỏ tới chính parent của nó. Top node sẽ không có parent. Để rõ hơn hãy xem các loại sản phẩm điện tử ở hình sau:

![mysql adjacency list](https://toilamit.com/wp-content/uploads/2019/05/mysql-adjacency-list.png)

Có một vài thuật ngữ bạn nên làm quen trước khi thực sự làm việc với ALM:

- `Electronics` là top node hoặc root node.
- Các node `Laptops, Cameras & photo, Phones & Accessories` là node con của node `Electronics`.
- Các node là lá sẽ không có node child như `Laptops, PC, Android, iOS`, ... trong khi các node không phải là node lá thì sẽ có ít nhất 1 node child.
- Children và grandchildren của 1 node được gọi là descendants (con cháu). Và parents, grandparents, etc., của 1 node được gọi là ancestors (tổ tiên).

Dựa theo sơ đồ trên, chúng ta có thể tạo 1 bảng `category` với 3 columns `id, title` và `parent_id`:

```sql
CREATE TABLE category (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  parent_id int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (parent_id) REFERENCES category (id) 
    ON DELETE CASCADE ON UPDATE CASCADE
);
```
Mỗi row sẽ là 1 node xác định bởi cột `id`. Cột `parent_id` được gán làm foreign key của chính bảng `category` luôn. Nó hoạt động như 1 con trỏ trỏ tới cột `id`.

### Inserting data
Root node sẽ không có parent nên là giá trị cột `parent_id` sẽ là `NULL`. Các node khác phải có ít nhất 1 parent.

Thêm mới root node:

```sql
INSERT INTO category(title,parent_id) 
VALUES('Electronics',NULL);
```

Để thêm mới một non-root node, chúng ta chỉ cần gán `parent_id` chính là giá trị `id` của node cha. Ví dụ, `parent_id` của các node `Laptop & PC, Cameras & Photos` và `Phone & Accessories` sẽ là 1:

```sql
INSERT INTO category(title,parent_id) 
VALUES('Laptops & PC',1);
 
INSERT INTO category(title,parent_id) 
VALUES('Laptops',2);
INSERT INTO category(title,parent_id) 
VALUES('PC',2);
 
INSERT INTO category(title,parent_id) 
VALUES('Cameras & photo',1);
INSERT INTO category(title,parent_id) 
VALUES('Camera',5);
 
INSERT INTO category(title,parent_id) 
VALUES('Phones & Accessories',1);
INSERT INTO category(title,parent_id) 
VALUES('Smartphones',7);
 
INSERT INTO category(title,parent_id) 
VALUES('Android',8);
INSERT INTO category(title,parent_id) 
VALUES('iOS',8);
INSERT INTO category(title,parent_id) 
VALUES('Other Smartphones',8);
 
INSERT INTO category(title,parent_id) 
VALUES('Batteries',7);
INSERT INTO category(title,parent_id) 
VALUES('Headsets',7);
INSERT INTO category(title,parent_id) 
VALUES('Screen Protectors',7);
```

### Tìm root node
Vì root node không có parent nên có `parent_id` là `NULL`.

```sql
SELECT
    id, title
FROM
    category
WHERE
    parent_id IS NULL;
```

![Find root node](https://toilamit.com/wp-content/uploads/2019/05/adjacency-list-root-node.png)

### Tìm node con
Truy vấn sau sẽ lấy các children của root node:

```sql
SELECT
    id, title
FROM
    category
WHERE
    parent_id = 1;
```

![Find children node](https://toilamit.com/wp-content/uploads/2019/05/adjacency-list-immediate-children.png)

### Tìm các node lá
Các node lá là các node không có children.

```sql
SELECT
    c1.id, c1.title
FROM
    category c1
        LEFT JOIN
    category c2 ON c2.parent_id = c1.id
WHERE
    c2.id IS NULL;
```

![Find leaf node](https://toilamit.com/wp-content/uploads/2019/05/adjacency-list-leaf-nodes.png)

### Truy vấn toàn bộ category
Chúng ta sẽ sử dụng [recursive common table expression (CTE)](https://toilamit.com/2019/05/23/gioi-thieu-va-cach-su-dung-mysql-recursive-cte/) để lấy toàn bộ dữ liệu category.

> Lưu ý CTE chỉ được sử dụng với phiên bản MySQL >= 8.0

```sql
WITH RECURSIVE category_path (id, title, path) AS
(
  SELECT id, title, title as path
    FROM category
    WHERE parent_id IS NULL
  UNION ALL
  SELECT c.id, c.title, CONCAT(cp.path, ' > ', c.title)
    FROM category_path AS cp JOIN category AS c
      ON cp.id = c.parent_id
)
SELECT * FROM category_path
ORDER BY path;
```

![adjacency list whole tree](https://toilamit.com/wp-content/uploads/2019/05/adjacency-list-whole-tree.png)

### Truy vấn sub-category
Giả sử chúng ta muốn lấy dữ liệu của category `Phone & Accessories` với `id = 7`.

```sql
WITH RECURSIVE category_path (id, title, path) AS
(
  SELECT id, title, title as path
    FROM category
    WHERE parent_id = 7
  UNION ALL
  SELECT c.id, c.title, CONCAT(cp.path, ' > ', c.title)
    FROM category_path AS cp JOIN category AS c
      ON cp.id = c.parent_id
)
SELECT * FROM category_path
ORDER BY path;
```

![adjacency list subtree](https://toilamit.com/wp-content/uploads/2019/05/adjacency-list-subtree.png)

### Truy vấn theo nhánh cây trong cây category
Giả sử chúng ta muốn truy vấn từ dưới lên trên theo nhánh `iOS` tới `Electronics`, chúng ta sẽ dùng truy vấn sau:

```sql
WITH RECURSIVE category_path (id, title, parent_id) AS
(
  SELECT id, title, parent_id
    FROM category
    WHERE id = 10 -- child node
  UNION ALL
  SELECT c.id, c.title, c.parent_id
    FROM category_path AS cp JOIN category AS c
      ON cp.parent_id = c.id
)
SELECT * FROM category_path;
```

![Querying a single path](https://toilamit.com/wp-content/uploads/2019/05/adjacency-list-single-path.png)

### Tính toán level của mỗi node
Giả sử level của root node là 0, mỗi node phía dưới sẽ bằng chính level của node cha cộng thêm 1.

```sql
WITH RECURSIVE category_path (id, title, lvl) AS
(
  SELECT id, title, 0 lvl
    FROM category
    WHERE parent_id IS NULL
  UNION ALL
  SELECT c.id, c.title,cp.lvl + 1
    FROM category_path AS cp JOIN category AS c
      ON cp.id = c.parent_id
)
SELECT * FROM category_path
ORDER BY lvl;
```

![Calculating level of each node](https://toilamit.com/wp-content/uploads/2019/05/adjacency-list-level.png)

### Xóa node và các các node con cháu
Để xóa node và tất cả các node con cháu thì chúng ta chỉ cần xóa node đó và tất cả các node con cháu sẽ tự động bị xóa bởi `DELETE CASCADE` do ràng buộc foreign key.

Ví dụ, xóa node `Laptops & PC` và các node children ( `Laptops, PC`), chúng ta sử dụng truy vấn:

```sql
DELETE FROM category 
WHERE
    id = 2;
```

### Xóa node và đẩy con cháu lên

Để xóa node không phải là node lá và đấy con cháu của nó lên chúng ta thực hiện 2 bước:

1. Đầu tiên cập nhật `parent_id` của children của node bằng với `id` của node parent mới.
2. Sau đó, xóa node.

Ví dụ, xóa node `Smartphones` và đẩy node con như là  `Android, iOS, Other Smartphones` lên:

Đầu tiên, cập nhật `parent_id` cho tất cả các children của `Smartphones`:

```sql
UPDATE category 
SET 
    parent_id = 7 -- Phones & Accessories
WHERE
    parent_id = 5; -- Smartphones
```

Thứ 2, xóa node `Smartphones`:

```sql
DELETE FROM category 
WHERE
    id = 8;
```

Chúng ta nên gộp 2 truy vấn vào thành 1 transaction:

```sql
BEGIN;
 
UPDATE category 
SET 
    parent_id = 7 
WHERE 
    parent_id = 5;
 
DELETE FROM category 
WHERE 
    id = 8;
 
COMMIT;
```

### Di chuyển 1 sub-category
Rất đơn giản, chỉ cần cập nhật giá trị `parent_id` của top node của sub-category là xong. Ví dụ, di chuyển `Cameras & photo` sang làm children của `Phone and Accessories`, chúng ta sử dụng lệnh sau:

```sql
UPDATE category 
SET 
    parent_id = 7
WHERE
    id = 5;
```

Trong bài viết này, chúng ta đã học cách sử dụng adjacency list model (ALM) để quản lý dữ liệu phân cấp.

Hãy like, share & comment để cùng nhau học hỏi nhé!
