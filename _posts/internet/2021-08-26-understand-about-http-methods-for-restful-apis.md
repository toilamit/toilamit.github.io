---
layout: post
title: HTTP Methods for RESTful APIs
categories: [Internet]
date: 2021-08-26 22:40:00 +0700
description: Sử dụng các HTTP Methods trong RESTful APIs một cách hợp lý và đúng chuẩn HTTP response với các phương thức GET, PUT, POST, DELETE hoặc TRACE.
img: http-method-for-restful-apis.png
fig-caption: # Add figcaption (optional)
tags: [http, restful api]
---
Tựa đề: HTTP Methods for RESTful APIs

Tạm dịch: Các giao thức HTTP trong RESTful APIs

Với tựa đề như vậy thì tui nghĩ hẳn các bạn biết nội dung sẽ nói về cái gì rồi phỏng?

Đơn giản thôi, làm ngành IT, đặc biệt là 1 dân web/app thì ai chả biết là giao tiếp giữa các trình duyệt và internet đều thông qua các giao thức HTTP. 

Tuy nhiên hẳn cũng có vài em chưa hiểu HTTP là cái chi chi. Nếu chưa hiểu thì có thể vô đây để hiểu trước à nha.

Trong phạm vi bài viết này, tui không giải thích cái HTTP nó là gì, cũng không giải thích HTTP nó hoạt động ra sao. Nếu quý zị có yêu cầu thì hãy comment để tui viết nha.

Như tựa đề thì tui sẽ nói đến các giao thức HTTP mà ở đây nó gồm: `GET, POST, PUT, DELETE, PATCH`.

Uhm, what? Nhìn quen vậy, ơ tui làm back-end nè, làm RESTful API tui dùng hoài à, ơ thế còn tui làm front-end. Cũng phải dùng chớ. Ờ ừm, mấy anh Senior thường bảo mấy cái này áp dụng cho việc CRUD (create, retrieve, update, delete). 

Thì đúng roài mà, cứ như vậy mà dùng thoai các chàng trai :D.

Dài dòng quá, túm cái quần què là ông muốn chia sẻ cái gì. (punch)

Huhu, bài này là nói về bản chất công việc chính của mỗi 1 HTTP methods trong RESTful API sẽ làm gì, đi liền với các http response code nào và các request URIs của chúng ra sao.

Thứ tự nội dung thì như này nè:
- <a href="#http_get">HTTP GET</a>
- <a href="#http_post">HTTP POST</a>
- <a href="#http_put">HTTP PUT</a>
- <a href="#http_delete">HTTP DELETE</a>
- <a href="#http_patch">HTTP PATCH</a>
- <a href="#summary">Tổng kết các phương thức HTTP cho RESTful APIs</a>
- <a href="#glossary">Chú thích thêm</a>

### <span id="http_get">HTTP GET</span>

Anh cả của tui - GET request **chỉ để lấy về thông tin hoặc các tài nguyên có sẵn**, và không được sửa đổi nội dung theo bất kì cách nào. Vì vậy mà GET request sẽ không thay đổi trạng thái của **resource**, và vì thế anh cả được xem là phương thức an toàn (safe method). Thêm nữa anh cả GET APIs xem như là bất biến (idempotent) - tức là trong mọi lần thực hiện request sẽ đều trả về kết quả giống nhau cho tới khi có anh 2 (POST), anh 3 (PUT) nào đó làm thay đổi giá trị của resource.

#### HTTP GET - HTTP response code:

- Có resource trên server -> Bắt buộc HTTP response code là `200 (OK)` và response body dạng `JSON` hoặc `XML`.
- Không có resource trên server -> Bắt buộc HTTP response code là `404 (NOT FOUND)`
- Nếu yêu cầu GET sai định dạng (ví dụ sai param hoặc thiếu param bắt buộc) -> Server trả về HTTP response code `400 (BAD REQUEST)`

#### Ví dụ request URIs

- HTTP GET https://kysuit.com/users
- HTTP GET https://kysuit.com/users?size=20&page=5
- HTTP GET https://kysuit.com/users/123
- HTTP GET https://kysuit.com/users/123/address

### <span id="http_post">HTTP POST</span>

Anh cả GET hiền lành bao nhiêu thì anh hai POST lại độc tài độc đoán bấy nhiêu.

Anh thích ai là tán cho bằng được, anh tấn công, anh gửi các loại quà (rẻ tiền, cũng như đắt tiền) để chinh phục cô nàng. (chết nhầm chủ đề).

Anh hai POST APIs **tạo ra các tài nguyên phụ thuộc (subordinate resource) mới**. Ví dụ: 1 file là phụ thuộc 1 thư mục chứa nó hoặc 1 bản ghi phụ thuộc vào table trong databse. Đúng với bản chất của REST thì POST sẽ tạo ra tập các resources.

Lý tưởng là nếu resource được tạo trên server gốc, thì HTTP response code **NÊN** là `201 (Created)` và gồm một entity (thực thể) với các mô tả như là trạng thái của request và tham chiếu tới resource mới tạo, và một [Location](https://en.wikipedia.org/wiki/HTTP_location) header nữa.

Trường hợp POST không trả về 1 resource thì HTTP response code là `200 (OK)` hoặc `204 (No Content)`.

Các response của anh hai POST này sẽ **không lưu vào cache**, trừ phi trong response header có các fields sau: [Cache-Control](https://en.wikipedia.org/wiki/Web_cache#Cache_control) hoặc [Expires](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html)

Đặc biệt chú ý là POST rất **lăng nhăng, không an toàn cũng như không bất biến**. Nếu mà gửi 2 lần request POST thì nó sẽ tạo ra 2 resource khác nhau chứa cùng 1 thông tin (ngoại trừ resource ids).

Vì vậy tui mới nói anh hai này không dễ chơi đâu, cẩn thận nghen.

#### Ví dụ request URIs

- HTTP POST https://kysuit.com/users
- HTTP POST https://kysuit.com/users/123/accounts

### <span id="http_put">HTTP PUT</span>

Vừa dứt lời với anh hai thì lại đến anh ba PUT này, ỡm ờ như đàn bà ý. Nhìn cái tên cũng thấy Pê Đê rồi. =))

Anh này đặc biệt chỉ chơi với các anh nào đã có nơi có chốn rồi nha, nhà cửa vợ con ổn định đề huề là chơi liền à. =))

PUT APIs thì chủ yếu là **cập nhật lại các resource đã tồn tại** (ồ ye! nếu mà không có resource thì anh này sẽ xem xét tạo mới resource hay không đó nha). Khi PUT APIs tạo mới resource thì **PHẢI** trả về HTTP response code là `201 (Created)` còn chỉ là vờn vờn rồi đớp miếng thì **NÊN** trả về `200 (OK)` hoặc `204 (No Content)` để biết được là đã cập nhật thành công hay chưa.

Anh ba PUT cũng nơ nớ anh hai POST là **không lưu vào cache** nha. Mọi trường hợp request lấy từ cache, hay các resource từ trong cache cũng **NÊN** được coi là đã cũ rồi.

> Khác biệt giữa POST và PUT APIs có thể được theo dõi qua request URIs. POST request được thực hiện dựa trên tập hợp các resource, ngược lại PUT request được thực hiện trên 1 resource duy nhất.

#### Ví dụ request URIs

- HTTP PUT https://kysuit.com/users/123
- HTTP PUT https://kysuit.com/users/123/accounts/456

### <span id="http_delete">HTTP DELETE</span>

Chị tư này thì cục tính rồi các giáo ạ, ghét ai là xử đẹp liền à. :D Nên là dính vào chị tư thì các anh cứ phải cẩn thận nha, kẻo hối không kịp à :D

Chị đẹp DELETE dựa vào các Request URI để **xóa resource**.

Các HTTP Response code của phương thức DELETE bao gồm:
- **Nên** là `200 (OK)` nếu response gồm 1 entity mô tả trạng thái
- `202 (Accepted)` nếu hành động được xếp vào hàng đợi
- ` 204 (No Content)` nếu hành động đã được thực hiện nhưng response không bao gồm 1 entity.

Chị tư DELETE này là **bất biến (idempotent)**. Việc đã gọi DELETE thành công thì nó sẽ xóa 1 resource trong tập các resources. Lặp lại việc gọi DELETE API lần nữa thì kết quả không có gì thay đổi cả. Tuy nhiên, việc gọi DELETE trên cùng 1 resource lần thứ 2 sẽ trả về `404 (Not Found)` vì nó đã bị xóa đi rồi. 

Chị tư DELTE cũng nơ nớ anh ba PUT là **không lưu vào cache** nha. Mọi trường hợp request lấy từ cache, hay các resource từ trong cache cũng **NÊN** được coi là đã cũ rồi.

#### Ví dụ request URIs

- HTTP DELETE https://kysuit.com/users/123
- HTTP DELETE https://kysuit.com/users/123/accounts/456

### <span id="http_patch">HTTP PATCH</span>

Tự dưng lòi đâu ra thêm chị năm này vậy, chắc gia đình này vỡ kế hoạch mất.

Chị năm ra đời với mục đích là chỉ **cập nhật 1 phần nào đó của resource**. Không giống như anh ba PUT đâu nhé.

Nếu trường hợp mà cập nhật toàn bộ resource thì các bạn nên nhờ anh ba PUT, chứ đừng gọi chị năm PATCH làm chi, tội nghiệp chị nha.

Phức tạp phải không nào, nếu dùng PATCH, PUT thì cần chú ý 1 vài vấn đề sau:

- Không phải tất cả các browsers, server và web application frameworks hỗ trợ chị năm PATCH này. Ví dụ IE8, PHP, Tomcat, Django và nhiều nữa sẽ không có hoặc có lỗi khi dùng chị năm PATCH.
- Request payload của PATCH không đơn giản như của PUT. Ví dụ: `HTTP PUT /users/1` sẽ trả về response như bên dưới.

`{id: 1, username: 'admin', email: 'email@example.org'}`

Còn khi PATCH update email sẽ như thế này: `HTTP PATCH /users/1`

```json
[
    { "op": "replace", "path": "/email", "value": "new.email@example.org" }
]
```

Cũng tùy theo các hành động mà kết quả có thể như sau:

```json
[
    { "op": "test", "path": "/a/b/c", "value": "foo" },
    { "op": "remove", "path": "/a/b/c" },
    { "op": "add", "path": "/a/b/c", "value": [ "foo", "bar" ] },
    { "op": "replace", "path": "/a/b/c", "value": 42 },
    { "op": "move", "from": "/a/b/c", "path": "/a/b/d" },
    { "op": "copy", "from": "/a/b/d", "path": "/a/b/e" }
]
```

Cuối cùng thì chị năm PATCH này không phải là sự thay thế cho anh hai POST, anh ba PUT mà bản thân nó chỉ áp dụng thay đổi 1 phần hơn là thay thế 1 resource.

### <span id="summary">Tổng kết các phương thức HTTP cho RESTful APIs</span>

Nói nhiều như trên cũng khó hiểu, thôi thì bảng dưới tổng hợp lại cho ae dễ hình dung hơn.

| HTTP Method | CRUD | Entire Collection (e.g. /users) | Specific Item (e.g. /users/123) |
| --- | --- | --- | --- |
| POS | Create | `201 (Created)`, header gồm `Location` với liên kết `/users/{id}` chưa ID mới | Tránh sử dụng POST trên single resource |
| GET | Read | `200 (OK)`, danh sách users. Có thể dùng để lấy: pagination, sorting và filtering | `200 (OK)`, single user. `404 (Not Found)`, nếu ID không có hoặc sai |
| PUT | Update/Replace | `405 (Not Allowed`, ngoại trừ nếu như muốn cập nhật toàn bộ resources | `200 (OK)` or `204 (No Content)`. `404 (Not Found) nếu ID không có hoặc sai` |
| PATCH | Partial Update/Modify | `405 (Not Allowed`, ngoại trừ nếu như muốn thay đổi toàn bộ resources | Title |
| DELETE | Delete | `405 (Not Allowed`, ngoại trừ nếu như muốn xóa toàn bộ resources - cẩn thận khi sử dụng | `200 (OK)`. `404 (Not Found)` nếu ID không có hoặc sai |

Đó, bảng nó cũng ngắn ngủi vậy thui. Sau này muốn dùng thì cứ nhảy vô bảng này xem lại cho lẹ nha.

### <span id="glossary">Chú thích thêm</span>

#### Safe Methods

Dựa vào mô tả các phương thức HTTP thì **phương thức GET và HEAD chỉ nên được sử dụng để truy xuất các tài nguyên có sẵn** - và chúng không hề update/delete resource trên server. Chính vì vậy mà 2 phương thức này gọi là "**safe**"

Điều này cũng cho phép các User Agent biết được rằng phương thức nào đang được thực hiện và không an toàn vì nó có thể update/delete resoure trên server như **POST, PUT và DELETE**. Và vì vậy hết sức cẩn thận khi sử dụng chúng.

#### Idempotent Methods

Thuật ngữ **idempotent** được dùng để mô tả 1 **hành động sẽ tạo ra kết quả giống nhau nếu thực hiện một hoặc nhiều lần**. Nó là một đặc tính hữu ích trong nhiều trường hợp, vì nó nhắm tới các hành động lặp lại hoặc thử lại nhiều lần mà không gây ra những ảnh hưởng ngoài ý muốn. Đối với các hành động **non-idempotent** thì cần phải theo dõi thêm là hành động đã xong hay chưa.

Trong mô tả các phương thức HTTP thì **GET, HEAD, PUT và DELETE là phương thức idempotent**. Còn các phương thức `OPTIONS` và `TRACE` **không nên** có side effects cho nên là chúng sẽ là non-idempotent.

### Tham khảo:
- https://developer.mozilla.org/en-US/docs/Glossary/Safe/HTTP
- https://www.w3.org/Protocols/rfc2616/rfc2616.txt
- http://tools.ietf.org/html/rfc6902
- https://en.wikipedia.org/wiki/Idempotence#Computer_science_meaning


Bài hơi dài nhưng góm gọn chỉ là bảng <a href="#summary">này</a> cùng 2 thuật ngữ [Safe Methods](https://developer.mozilla.org/en-US/docs/Glossary/Safe/HTTP) và [Idepotent Methods](https://developer.mozilla.org/en-US/docs/Glossary/Idempotent) mà thôi.

Hi vọng bài viết có ích và nhận được nhận xét của bạn đọc để cải thiện hơn.

Nếu hay, có ích thì like, share nhé.

Thank for reading!