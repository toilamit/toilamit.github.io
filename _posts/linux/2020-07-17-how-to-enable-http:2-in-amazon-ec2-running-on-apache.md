---
layout: post
title: How to Enable HTTP:2 in Amazon EC2 running on Apache
categories: [linux]
date: 2020-07-17 09:00:00 +0700
description: Tìm hiểu về HTTP2 và hướng dẫn enable HTTP2 trên Amazon EC2 với Apache.
img: http2.jpg
fig-caption: # Add figcaption (optional)
tags: [linux, apache, httpd, http2, amazon EC2]
---

Vào ngày đẹp trời khách báo site chết. Méo mặt, lại lóc cóc SSH ...

Kiểm tra `/var/log/httpd/error_log` thì có lỗi

```
[http2:warn] [pid 3132] AH10034: The mpm module (prefork.c) is not supported by mod_http2. The mpm determines how things are processed in your server. HTTP/2 has more demands in this regard and the currently selected mpm will just not do. This is an advisory warning. Your server will continue to work, but the HTTP/2 protocol will be inactive.
```

(thực ra là 1 đống lỗi nhưng phải xử lý cái lỗi khỉ gió này trước đã)

Là sao nhỉ? Liên quan tới HTTP2 à? [HTTP2 là quần què gì?](https://en.wikipedia.org/wiki/HTTP/2)

[Test HTTP2](https://tools.keycdn.com/http2-test) xem nào.

Khoan. Test làm gì nhỉ? Có lỗi trên kia thì là chưa có HTTP2 rồi. Hỏi chi nữa LOL.

Lại lóc có, gu gồ, hỏi đàn anh đàn chị, mafia, yakuza.. cũng hiểu và bắt đầu làm theo =)).

## Enable HTTP2

1. Check Apache version

    ```
    $ httpd -v

    Server version: Apache/2.4.41 ()
    Server built:   Oct 22 2019 22:59:04
    ```
2. Check MPM module

    ```
    $ httpd -V | grep MPM

    Server MPM:     prefork
    ```

    Cần đổi sang `event` thay vì sử dụng `prefork`

3. Load module

    ```
    $ vi /etc/httpd/conf.modules.d/00-mpm.conf
    ```

    Comment out cái dòng này lại:
    ```
    LoadModule mpm_prefork_module modules/mod_mpm_prefork.so
    ```

    Thêm dòng này nếu chưa có, hoặc bỏ comment nếu đã có: 
    ```
    LoadModule mpm_event_module modules/mod_mpm_event.so
    ```

    Nội dung file sẽ là:
    ```
    # Select the MPM module which should be used by uncommenting exactly
    # one of the following LoadModule lines.  See the httpd.service(8) man
    # page for more information on changing the MPM.

    # prefork MPM: Implements a non-threaded, pre-forking web server
    # See: http://httpd.apache.org/docs/2.4/mod/prefork.html
    #
    # NOTE: If enabling prefork, the httpd_graceful_shutdown SELinux
    # boolean should be enabled, to allow graceful stop/shutdown.
    #
    #LoadModule mpm_prefork_module modules/mod_mpm_prefork.so

    # worker MPM: Multi-Processing Module implementing a hybrid
    # multi-threaded multi-process web server
    # See: http://httpd.apache.org/docs/2.4/mod/worker.html
    #
    #LoadModule mpm_worker_module modules/mod_mpm_worker.so

    # event MPM: A variant of the worker MPM with the goal of consuming
    # threads only for connections with active processing
    # See: http://httpd.apache.org/docs/2.4/mod/event.html
    #
    LoadModule mpm_event_module modules/mod_mpm_event.so
    ```

    Check lại xem sao:
    ```
    $ httpd -V | grep MPM

    Server MPM:     event
    ```

4. Sửa httpd config

    Thêm 2 dòng sau vào cuối file `/etc/httpd/conf/httpd.conf`

    ```
    Protocols h2 http/1.1
    Protocols h2 h2c http/1.1
    ```

    Nội dung sẽ là:
    ```
    ...
    # Supplemental configuration
    #
    # Load config files in the "/etc/httpd/conf.d" directory, if any.
    IncludeOptional conf.d/*.conf

    Protocols h2 http/1.1
    Protocols h2 h2c http/1.1
    ```

    Hoặc nếu chỉ thêm vào đích danh 1 domain nào đó

    Ví dụ sửa file `/etc/httpd/conf.d/example.com.conf`:

    ```
    <VirtualHost *:80>
        <Directory "/var/www/html/example.com">
            Options FollowSymLinks MultiViews
            AllowOverride All
        </Directory>

        Protocols h2 http/1.1
        Protocols h2 h2c http/1.1

        ServerAdmin webmaster@localhost
        ServerName example.com
        DocumentRoot "/var/www/html/example.com"
        ErrorLog /var/log/httpd/example.com/error.log
        CustomLog /var/log/httpd/example.com/access.log combined
    </VirtualHost>
    ```
5. Restart httpd mà mysqld

    ```
    $ systemctl restart httpd
    $ systemctl restart mysqld
    ```

6. Re-test [here](https://http2.pro)

## Tham khảo
- https://tools.keycdn.com/http2-test
- [mod_http2 (Apache Docs)](https://httpd.apache.org/docs/2.4/mod/mod_http2.html)
- [Apache’s HTTP/2 guide](https://httpd.apache.org/docs/2.4/howto/http2.html)
- [extensive HTTP/2 FAQ](https://http2.pro/doc/Apache)
- https://techwombat.com/enable-http2-apache-ubuntu-16-04/
- https://www.youtube.com/watch?v=zT2iCk7-HLs
