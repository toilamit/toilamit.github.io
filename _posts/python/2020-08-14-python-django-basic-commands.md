---
layout: post
title: Python Django - Basic Commands
categories: [python, django]
date: 2020-08-14 09:00:00 +0700
description: django python with basic commands from scratch, you can run migrations, creating superuser or any app what you want.
img: python-django-basic-command.jpeg
fig-caption: Memo Basic Django Commands
tags: [python, django, command line]
---

Hẳn nhiều ae IT làm việc với Django project sẽ biết và sử dụng các lệnh cơ bản.

Tuy nhiên nhiều lúc sẽ không nhớ hết được các command để run.

Trong bài này thì mình chỉ là tổng hợp và memo lại các lệnh cơ bản mà hay dùng khi làm với Django

Môi trường chạy lệnh

- Python 3.7.7
- Django 3.0.4

## Check env version

```
$ python3 -V
```

```
$ python3 -m django version
```

## Create Django project
### Installing Django
```
$ python3 -m pip install django
```

### Create new project
```
$ django-admin startproject PROJECT_NAME
```

Sau khi tạo mới project thì các bạn cd vào project đã tạo bằng lệnh

```
$ cd PROJECT_NAME
```

Oke well done, các lệnh dưới cứ mở terminal lên và run thôi nha :)

Lưu ý là bạn phải ở thư mục dự án Django mà có file `manage.py` à nha :P

## Create superuser
```
$ python3 manage.py createsuperuser
```

## Create an app
```
$ python3 manage.py startapp APP_NAME
```

## Make migrations
```
$ python3 manage.py makemigrations
```

## Show migrations
### Show all migrations
```
$ python3 manage.py showmigrations
```
Hoặc lệnh dưới
```
$ python3 manage.py showmigrations --list
```

### Show migration of specific app
```
$ python3 manage.py showmigrations APP_NAME
```

### Show unapplied migration
```
$ python3 manage.py showmigrations --list | grep -v '\[X\]'
```

## Run migration
```
$ python3 manage.py migrate
```

## Rollback migration from specific app
```
$ python3 manage.py migrate APP_NAME zero
```

## Collect static files
```
$ python3 manage.py collectstatic --noinput
```

## Runserver
```
$ python3 manage.py runserver
```

Nếu có thêm command nào hữu ích thì comment nha các bạn :D