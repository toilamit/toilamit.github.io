---
layout: post
title: Auto deploy angular application by PHP script - Phần 1 - Muốn làm nghiệp lớn thì phải có tools (Apache 2.4, PHP 7.4, NodeJS)
categories: [DevOps]
date: 2021-08-12 12:15:00 +0700
description: 
img: devops-continuous-delivery-default.png
fig-caption: # Add figcaption (optional)
tags: [linux, bash, apache, php, nodejs, npm]
---

## Giải thích lý do
- Vì đang dùng backlog nên không có CICD
- Phải viết 1 cái webhook và tích hợp vào backlog để tự build + deploy khi mà có merged PR
- Không muốn tay quá to, muốn tay to thì làm cái khác =))
- Bài viết sẽ chia làm 2 phần:
    - Phần 1: Muốn làm nghiệp lớn thì phải có tools (Apache 2.4, PHP 7.4, NodeJS)
    - Phần 2: Kỹ nghệ deploy với PHP script

## Các điều kiện cần có
- Kiến thức về Linux + Bash Script + Git + Vim + ... (kiểu như 1 đép ọp ẹp)
- 1 webserver có thể dùng ngay EC2 (Linux 2x) → mua lấy 1 cái, đơn giản không à
- Cài các service cần thiết (tham khảo link)
    - Apache 2.4 (httpd)
    - PHP 7.4
    - NodeJS and NPM
    - Angular CLI
    - Git

## Phần 1: Muốn làm nghiệp lớn thì phải có tools (Apache 2.4, PHP 7.4, NodeJS)
À trước khi làm gì con gái nhà người ta thì phải vào được nhà người ta đã.

Cần có chìa khóa hoặc đập mẹ nó cửa mà xông vào. Key ở đây là 1 `private_key.pem`. Đấy, dạng `.pem` là cứ vào nhà mà bem thôi.

Truy cập server đi rồi cái cái gì thì cài:

```
ssh -i /path/to/private_key.pem ec2-user@dia_chi_ip_server
```

Thấy chưa, vào được nhà rồi thì giản đơn không à. Nom nó như này (nhà đẹp phết, có trang trí hoa lá cành nữa, thiếu mỗi con chó):

```
Last login: Thu Aug 12 02:51:50 2021 from xxx.yy.zz.ww

       __|  __|_  )
       _|  (     /   Amazon Linux 2 AMI
      ___|\___|___|

https://aws.amazon.com/amazon-linux-2/
No packages needed for security; 1 packages available
Run "sudo yum update" to apply all updates.
```

Rôi đó, xong rồi thì xin cái quyền `root` để bày vẽ nào:

```
sudo su root
```

Đại khái là không dùng thằng user `ec2-user` mà dùng thằng `root` làm cho ngầu:

### Cài 2 thằng bạn cứt đít Apache 2.4 và PHP 7.4 
Làm gì thì làm cứ cập nhật mới nhất cái đã, lỗi đâu tính sau:
```
sudo yum update -y
```

Roài, giờ cài thằng anh Apache 2.4 trước cái đã, vì muốn dùng cả https nên cài thêm thằng `mod_ssl`
```
sudo yum install -y httpd httpd-tools mod_ssl
```

Định hỏi thằng `httpd` nó ở đâu ra thì ngẫm thấy nó có sẵn trong nhà của Amazon Linux 2 rồi (yum repositories) thì thôi.

Cài đặt cho Apache tự động start và thử start nó lên xem nó ra sao:

```
# Tự động start khi boot nhé
sudo systemctl enable httpd

# Start bằng tay to
sudo systemctl start httpd
```

Không tin nó đã start chưa thì chạy lệnh `sudo systemctl status httpd` là thấy liền à. Nếu thấy có chữ running thì là đang chạy rồi nha.

```
● httpd.service - The Apache HTTP Server
   Loaded: loaded (/usr/lib/systemd/system/httpd.service; disabled; vendor preset: disabled)
  Drop-In: /usr/lib/systemd/system/httpd.service.d
           └─php-fpm.conf
   Active: active (running) since Wed 2021-08-11 07:13:40 UTC; 21h ago
     Docs: man:httpd.service(8)
 Main PID: 14647 (httpd)
   Status: "Total requests: 496; Idle/Busy workers 100/0;Requests/sec: 0.00644; Bytes served/sec: 779 B/sec"
   CGroup: /system.slice/httpd.service
           ├─14647 /usr/sbin/httpd -DFOREGROUND
           ├─14648 /usr/sbin/httpd -DFOREGROUND
           ├─14650 /usr/sbin/httpd -DFOREGROUND
           ├─14655 /usr/sbin/httpd -DFOREGROUND
           ├─14661 /usr/sbin/httpd -DFOREGROUND
           ├─14678 /usr/sbin/httpd -DFOREGROUND
           ├─14695 /usr/sbin/httpd -DFOREGROUND
           ├─14832 /usr/sbin/httpd -DFOREGROUND
           ├─16961 /usr/sbin/httpd -DFOREGROUND
           ├─16969 /usr/sbin/httpd -DFOREGROUND
           └─17252 /usr/sbin/httpd -DFOREGROUND
```

Rồi, thằng anh xong rồi giờ thì tới thằng em PHP 7.4 nhỉ. Nhắm thịt anh xong thịt cả em luôn :)

Thằng PHP mới nhất cũng có sẵn ở amazon-linux-extras repositories roài, nên muốn cài nó thì chắc chắn là Linux 2 phải được cài sẵn extras repository nhá.

Cài như này này:

```
sudo yum install amazon-linux-extras -y
```

Đấy, cài xong rồi thì tìm PHP version phù hợp và có sẵn thôi, chứ giờ đi search google mệt nhắm :P

```
sudo amazon-linux-extras | grep php
```

Xem nè chỉ có vậy thui, nhà ít con quá mà :D

```
  _  php7.2                   available    \
  _  lamp-mariadb10.2-php7.2  available    \
  _  php7.3                   available    \
 42  php7.4=latest            enabled      [ =stable ]
  _  php8.0                   available    [ =stable ]
```

Thôi cứ nhắm thằng `=stable` mà cài vì nó khá ổn định. Còn thằnng `php8.0` nó mới nhất quá cũng chưa chắc có nhiều support. Thế nha, tui chọn thằng `php7.4` à nghen.

```
sudo amazon-linux-extras enable php7.4 
```

Roài đó, chả có gì ngầu đâu, tuy nhiên bơm thêm tí phụ kiện cho em PHP này để chạy đỡ lỗi nha. Bật mí, có 1 số các packages hoặc extensions là không cần thiết lắm, tuy nhiên cứ cài nó lên nha.

```
sudo yum clean metadata
sudo yum install php php-common php-pear
sudo yum install php-{cgi,curl,mbstring,gd,mysqlnd,gettext,json,xml,fpm,intl,zip,pdo,cli}
```

Kiểm tra lại nào:

```
php -v
```

Output:

```
PHP 7.4.21 (cli) (built: Jul  7 2021 17:35:08) ( NTS )
Copyright (c) The PHP Group
Zend Engine v3.4.0, Copyright (c) Zend Technologies
```

Chuẩn ajinomoto đó.

Xong rồi, mấy thằng em thằng anh này nó đơn giản không ý mà, check lại lượt cuối xem 2 ae nhà này hoạt động chưa nha:

Check PHP info nhé:

```
echo "<?php phpinfo(); ?>" > /var/www/html/info.php
```

Chạy trên trình duyệt url sau: http://dia_chi_ip_server/info.php

Nó mà ra được cái màn hình tím thủy chung của PHP và các thông tin thì là thành công rồi nha. Còn không ra được thì chắc bạn không chung thủy rồi, xem lại cách ăn ở đi =))))

Ờ quên, thằng anh Apache 2.4 còn bảo là nên tạo 1 cái Virtual Host để chạy bằng domain chứ, không ai mà nhớ đc ip chứ. 

```
vi /etc/httpd/conf.d/kysuit.net.conf 
```

Thêm nội dung như sau

```
<VirtualHost *:80>
    ServerAdmin webmaster@kysuit.net
    ServerName kysuit.net
    ServerAlias www.kysuit.net
    DocumentRoot /var/www/kysuit.net

    ErrorLog /var/log/httpd/kysuit.net-error_log
    CustomLog /var/log/httpd/kysuit.net-access_log combined
</VirtualHost>
```

Save lại và restart lại `httpd`

```
sudo systemctl restart httpd
```

## Hấp diêm NodeJS
Oh, muốn vậy thì phải cho phép thằng node.js nó vô nhà mềnh đã chứ. Có 2 loại:

- Hàng mới, sang xịn mịn (Latest Release):

```
sudo yum install -y gcc-c++ make
curl -sL https://rpm.nodesource.com/setup_16.x | sudo -E bash -
```

- Hàng ổn định, dùng miễn chê (Stable Release):

```
sudo yum install -y gcc-c++ make
curl -sL https://rpm.nodesource.com/setup_14.x | sudo -E bash - 
```

Có hàng rồi thì hấp diêm thôi:

```
sudo yum install -y nodejs 
```

Ngọt lịm chưa, check version phát:

```
node -v
```

Output:

```
v14.17.4
```

NPM version

```
npm -v
```

Output

```
6.14.14
```

Nhìn vào output trên thì đố ae biết tôi chọn em hàng nào =)).

Ơ mà mới thịt được 4 em này mà lâu phết, ngót cũng mấy chục phút. =)). Phần 1 tạm thời dừng ở đây nha, chờ 500 ae ở Phần 2: Kỹ nghệ deploy với PHP script.

Nếu có bất kỳ góp ý gì thì hãy comment nha, nếu thích thì like và share nha :D
