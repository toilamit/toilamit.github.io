---
layout: post
title: Tối ưu google pagespeed insights cho website
categories: [Wordpress, JS, Kamazuka]
date: 2019-08-16 10:58:00 +0300
description: 
img: 
fig-caption: 
tags: [pagespeed, google insights, tăng tốc website, tối ưu website]
---

https://thachpham.com/wordpress/wordpress-tutorials/toi-uu-google-pagespeed-insights-cho-wordpress-phan-1.html

## 16 tiêu chuẩn đánh giá của google
https://developers.google.com/speed/docs/insights/rules

### Quy tắc tối ưu tốc độ

- Tránh sử dụng chuyển hướng ở trang đích.
- Bật chức năng nén dữ liệu gửi về trình duyệt.
- Cải thiện thời gian phản hồi của máy chủ.
- Cải thiện bộ nhớ đệm ở trình duyệt.
- Nén các tài nguyên CSS và Javascript trên website.
- Nén giảm dung lượng hình ảnh.
- Tối ưu việc chèn CSS vào website.
- Thiết lập thứ tự ưu tiên của nội dung trong website.
- Bỏ chặn Javascript và CSS khi tải trang.

### Quy tắc tối ưu hiệu suất sử dụng

- Tránh sử dụng các trình cắm (plugin) để hiển thị nội dung.
- Cấu hình viewport để hiển thị kích thước màn hình phù hợp.
- Tối ưu các nút bấm hoặc liên kết trên website.
- Sử dụng cỡ chữ phù hợp để hiển thị nội dung.

## Sử dụng host phù hợp
- A2Hosting (Singapore)
- StableHost, Arvixe (Hongkong)
- CloudFlare

## Tránh redirect trang

## Bật chức năng nén

Kiểm tra Gzip: http://gzipwtf.com/

Sử dụng 1 số plugin để bật Gzip
- W3 Total Cache (bật Browser Cache)
- WP Super Cache (bật ở tab Advanced)

Bật Gzip trên Apache sử dụng .htaccess
```
<ifModule mod_gzip.c>
mod_gzip_on Yes
mod_gzip_dechunk Yes
mod_gzip_item_include file .(html?|txt|css|js|php|pl)$
mod_gzip_item_include handler ^cgi-script$
mod_gzip_item_include mime ^text/.*
mod_gzip_item_include mime ^application/x-javascript.*
mod_gzip_item_exclude mime ^image/.*
mod_gzip_item_exclude rspheader ^Content-Encoding:.*gzip.*
</ifModule>
```

hoặc nếu đoạn trên lỗi

```
AddOutputFilterByType DEFLATE text/plain
AddOutputFilterByType DEFLATE text/html
AddOutputFilterByType DEFLATE text/xml
AddOutputFilterByType DEFLATE text/css
AddOutputFilterByType DEFLATE application/xml
AddOutputFilterByType DEFLATE application/xhtml+xml
AddOutputFilterByType DEFLATE application/rss+xml
AddOutputFilterByType DEFLATE application/javascript
AddOutputFilterByType DEFLATE application/x-javascript
```

Bật Gzip trên Nginx trong file nginx.conf

```
gzip on;
gzip_comp_level 2;
gzip_http_version 1.0;
gzip_proxied any;
gzip_min_length 1100;
gzip_buffers 16 8k;
gzip_types text/plain text/html text/css application/x-javascript text/xml application/xml application/xml+rss text/javascript;

# Disable for IE < 6 because there are some known problems
gzip_disable "MSIE [1-6].(?!.*SV1)";

# Add a vary header for downstream proxies to avoid sending cached gzipped files to IE6
gzip_vary on;
```

## Cải thiện thời gian phản hồi máy chủ
- Sử dụng các host tốt: https://thachpham.com/hosting-domain/shared-hosting-tot-nhat-cho-wordpress.html
- Dùng [Newrelic](https://thachpham.com/tools/hay-cai-newrelic-len-may-chu-de-theo-doi-tot-hon.html) theo dõi tốc độ VPS

--> lựa chọn các cách dữ liệu đệm: Database Cache, Object Cache
https://thachpham.com/wordpress/cache-trong-wordpress.html

Nếu dùng VPS thì nên dùng: [EasyEngine](https://thachpham.com/hosting-domain/may-chu/gioi-thieu-easyengine.html) hoặc [Centminmod](https://thachpham.com/hosting-domain/vps-can-ban-voi-centminmod-part1.html)

## Cải thiện bộ nhớ đệm của trình duyệt
- Nên cache các file tĩnh tầm khoảng 1 tháng
- Sử dụng bằng cách khai báo `Cache-Control` và `ETag` vào `HTTP Headers`
- Kiểm tra nhanh HTTP Headers tại: http://web-sniffer.net/

- Thêm thời hạn cache bằng CloudFlare: Caching > Browser Cache Expiration
- W3 Total Cache: Performance > Browser Cache và check “Set entity tag (eTag)“, “Set cache control header“
- Apache
```
<ifmodule mod_expires.c>
<Filesmatch "\.(jpg|jpeg|png|gif|js|css|swf|ico|woff|mp3)$">
 ExpiresActive on
 ExpiresDefault "access plus 1 year"
</Filesmatch>
</ifmodule>
```

hoặc nếu đoạn trên k chạy

```
ExpiresActive On
ExpiresByType image/jpg "access plus 1 year"
ExpiresByType image/jpeg "access plus 1 year"
ExpiresByType image/gif "access plus 1 year"
ExpiresByType image/png "access plus 1 year"
ExpiresByType text/css "access plus 1 month"
ExpiresByType application/pdf "access plus 1 month"
ExpiresByType text/x-javascript "access plus 1 month"
ExpiresByType application/x-shockwave-flash "access plus 1 month"
ExpiresByType image/x-icon "access plus 1 year"
ExpiresDefault "access plus 2 days"
```

- Nginx: thêm vào file .conf của domain

```
# Media: images, icons, video, audio, HTC
location ~* \.(?:jpg|jpeg|gif|png|ico|cur|gz|svg|svgz|mp4|ogg|ogv|webm|htc)$ {
 expires 1M;
 access_log off;
 add_header Cache-Control "public";
}

# CSS and Javascript
location ~* \.(?:css|js)$ {
 expires 1y;
 access_log off;
 add_header Cache-Control "public";
}
```


## Làm nhỏ JS, CSS
- Trình duyệt chỉ tải tối đa 10 req 1 lúc
- Minify, gộp các JS, CSS vào làm 1
- Sử dụng plugin (có thể làm layout bị lỗi)
    - [Speed Booster Pack](https://wordpress.org/plugins/speed-booster-pack/) (recommended)
    - [Better WP Minify](https://wordpress.org/plugins/bwp-minify/)
    - W3 Total Cache
- Nếu sử dụng Google Pagespeed thì thêm các filter này
    - Apache
    ```
    ModPagespeedEnableFilters combine_css,rewrite_css,rewrite_javascript,combine_javascript
    ```
    - Nginx
    ```
    pagespeed EnableFilters combine_css,rewrite_css,rewrite_javascript,combine_javascript;
    ```

## Nén dung lượng hình ảnh

https://thachpham.com/wordpress/wordpress-tutorials/su-dung-anh-tren-website-dung-cach-va-toi-uu.html

- Nén trước khi up: phần mềm [Ceasium](https://sourceforge.net/projects/caesium/) (Windows) hoặc [ImageOptim](https://imageoptim.com/mac) (Mac)
- Link nén: https://tinypng.com/
- Sử dụng plugin: [WP Smush](https://wordpress.org/plugins/wp-smushit/), [EWWW Image Optimizer](https://wordpress.org/plugins/ewww-image-optimizer/) hoặc [imagify](https://imagify.io/wordpress/)

## Tối ưu chèn CSS
- Các CSS bên ngoài sẽ được request sau khi nội dung site hiển thị
- K nên tách nhiều css để tải nhiều
- Nếu css ngắn thì nên inline-style
- Nếu css lớn thì chỉ tải các đoạn css cần thiết và nhúng inline đoạn đó vào site
- Tránh inline-style vì bị chặn bởi [Content Security Policy](https://www.w3.org/TR/CSP/)

- Tải inline các đoạn CSS cần thiết
    - Dùng JS điều hướng website tự lấy các đoạn CSS
    - Dùng tool [Critical Path CSS](http://jonassebastianohlsson.com/criticalpathcssgenerator/) để biết website lấy đoạn nào đầu tiên --> chèn inline-style (`<style>`)
    - Nếu là coder thì sử dụng SASS + Grunt Task như bài [Authoring Critical Above-the-Fold CSS](https://css-tricks.com/authoring-critical-fold-css/)
    - Nếu dùng Google Pagespeed thì dùng module prioritize_critical_css
    - Sử dụng plugin Speed Booster Pack

## Thiết lập thứ tự ưu tiên của nội dung trong website
- Tải từ trên xuống
- Các source k cần thiết thì cho tải sau
- JS cho xuống footer để tải sau
- Có thể sử dụng các plugin như W3 Total Cache, Booster Pack, Scripts to Footer.

## Sử dụng JS tải không đồng bộ
- Nếu là coder thì dùng `async` như
```
<script src="demo_async.js" async></script>
```
- Sử dụng plugin: https://thachpham.com/wordpress/wp-plugin/plugin-tang-toc-bang-asynchronous.html
- Sử dụng CloudFlare
