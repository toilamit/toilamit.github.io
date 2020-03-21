---
layout: post
title: Hướng dẫn cài đặt Python 3.7 trên CentOS/RHEL 7/6 & Fedora 30-25
categories: [Linux, CentOS]
date: 2019-06-26 09:00:00 +0700
description: 
img: # Add image post ex: viet-dep-zai.jpg (optional)
fig-caption: # Add figcaption (optional)
tags: [linux, CentOS, python]
---

Python là một ngôn ngữ rất mạnh, thân thiện và rất dễ sử dụng. Tại thời điểm viết bài này thì phiên bản mới nhất là Python 3.7.3, bạn có thể download ở [đây](https://www.python.org/downloads/). Trong bài viết này sẽ hướng dẫn bạn cách cài đặt Python 3.7 trên hệ thống CentOS, Red Hat & Fedora.

## Bước 1 – Cài đặt các yêu cầu

Trước khi cài đặt Python, bạn cần phải cài đặt GCC compiler. Bạn hãy login server của mình sử dụng ssh hoặc shell access. Sau khi login chạy lệnh dưới đây để cài đặt các yêu cầu trước khi cài Python.

```console
$ yum install gcc openssl-devel bzip2-devel libffi-devel
```

## Bước 2 – Download Python 3.7

Lệnh dưới sẽ tải Python từ website chính thức. Bạn cũng có thể tải bản mới nhất vào thư mục được chỉ ra ở dưới.

```console
$ cd /usr/src
$ wget https://www.python.org/ftp/python/3.7.3/Python-3.7.3.tgz
```

Bây giờ giải nén file đã tải về.

```console
$ tar xzf Python-3.7.3.tgz
```

## Bước 3 – Cài đặt Python 3.7

Use below set of commands to compile Python source code on your system using altinstall.

```console
$ cd Python-3.7.3
$ ./configure --enable-optimizations
$ make altinstall
```

Sử dụng lệnh `make altinstall` để tránh thay thế tệp binary mặc định của python `/usr/bin/python`.

Bây giờ hãy xóa file nén đi.

```console
$ rm /usr/src/Python-3.7.3.tgz
```

## Bước 4 – Kiểm tra Python Version

```console
$ python3.7 -V

Python 3.7.3
```
