---
layout: post
title: How To Use git with Multiple Remote Repositories
categories: [Git]
date: 2020-07-24 09:00:00 +0700
description: 
img: # Add image post ex: viet-dep-zai.jpg (optional)
fig-caption: # Add figcaption (optional)
tags: [git, multiple remotes, git remote]
---
## Kiểm tra remotes

Mặc định khi clone repository thì remote sẽ là `origin`

Kiểm tra remote hiện tại:

```
$ git remote -v
```

Nếu có nhiều remote thì sẽ hiển thị nhiều URL ở output

Với nhiều remotes thì có thể dễ dàng push code qua lại giữa các remotes với nhau

## Thêm mới remote

Sử dụng lệnh sau:

```
$ git remote add <REMOTE_NAME> <REMOTE_URL>
```

## Push code lên second remote

```
git push second_remote master
```

- `second_remote` là tên remote
- `master` là nhánh muốn push lên

Hoặc sử dụng `--set-upstream` để đặt remote mặc định

```
$ git push --set-upstream second_remote master
```

## Refs:
- https://www.cloudsavvyit.com/2464/how-to-use-git-with-multiple-remote-repositories/