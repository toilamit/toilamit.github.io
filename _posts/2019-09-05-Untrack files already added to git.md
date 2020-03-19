---
layout: post
title: Untrack files already added to git
permalink: # Add permalink ex: /javascript (optional)
date: 2019-09-05 13:37:00 +0700
description: You’ll find this post in your `_posts` directory # Add post description (optional)
img: # Add image post ex: viet-dep-zai.jpg (optional)
fig-caption: # Add figcaption (optional)
tags: [Holidays, Hawaii]
---

Bài viết chỉ ra cách để xóa các file không cần thiết khỏi repository và đưa vào file `.gitignore` và đồng thời vẫn giữ nguyên các file đó ở local.

## Bước 1: Commit tất cả các thay đổi

Phải đảm bảo là tất cả các thay đổi đươc commit lên repository, bao gồm cả file `.gitignore`.

## Bước 2: Xóa toàn bộ files khỏi repository

Sử dụng command sau:

```
git rm -r --cached .
```

Trong đó:

- `rm` là lệnh xóa
- `-r` sẽ cho phép xóa bằng đệ quy (xóa các file bên trong thư mục)
- `–cached` sẽ chỉ xóa các files từ index. Và các files vẫn tồn tại ở local.
- `.` chỉ ra là tất cả các files sẽ `untracked`. Có thể chỉ untrack file với command `git rm --cached foo.txt`.
The rm command can be unforgiving. If you wish to try what it does beforehand, add the -n or --dry-run flag to test things out.

## Bước 3: Add lại tất cả files
```
git add .
```

## Bước 4: Commit
```
git commit -m ".gitignore fix"
```

Đến đây thì repository của bạn đã sạch sõe rồi :)

Đừng quên push các thay đổi lên remote nhé :D `git push`

## Nguồn tham khảo
- http://www.codeblocq.com/2016/01/Untrack-files-already-added-to-git-repository-based-on-gitignore/
