PHP Get Absolute Path, Document Root, Base URL

Trong lập trình PHP, việc lấy đường dẫn tuyệt đối, document root hay base url sẽ là 1 chút khó khăn cho những bạn mới làm quen với PHP. Vì vậy bài viết này sẽ hướng dẫn 1 số snippets để lấy absolute path, document root và base URL.

## Lấy đường dẫn tuyệt đối (absolute path)
Giả sử code hoặc script của bạn đặt trong `/path/directory/`, thì đoạn code snippet sau sẽ trả về kết quả như sau:

```
/var/www/path/example.com/httpdocs/path/directory.
```

```
$base_dir = __DIR__;
```

Chú ý là kết quả không có dấu `/` ở cuối.

## Lấy document root
Snippet sẽ trả về document root mà không có script filename:

```
$doc_root = preg_replace("!${_SERVER['SCRIPT_NAME']}$!", '', $_SERVER['SCRIPT_FILENAME']);
```

Ví dụ sẽ trả về dạng `/var/www/path/example.com/httpdocs`.

Chú ý là kết quả không có dấu `/` ở cuối.

## Lấy base URL của script hiện tại
Ví dụ, nếu script của bạn đặt trong `/path/directory/` của website `example.com`, thì đoạn code scippet sẽ trả về: `http://example.com/path/directory`.

```php
// base directory
$base_dir = __DIR__;

// server protocol
$protocol = empty($_SERVER['HTTPS']) ? 'http' : 'https';

// domain name
$domain = $_SERVER['SERVER_NAME'];

// base url
$base_url = preg_replace("!^${doc_root}!", '', $base_dir);

// server port
$port = $_SERVER['SERVER_PORT'];
$disp_port = ($protocol == 'http' && $port == 80 || $protocol == 'https' && $port == 443) ? '' : ":$port";

// put em all together to get the complete base URL
$url = "${protocol}://${domain}${disp_port}${base_url}";

echo $url; // = http://example.com/path/directory
```

Chú ý là kết quả không có dấu `/` ở cuối.