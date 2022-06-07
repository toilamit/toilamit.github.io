---
layout: post
title: "Git: Learn all about tag"
categories: [git]
date: 2022-06-07 10:20:00 +0700
description: Learn tag commands in git and you can show list tag, create tag, delete tag or push tag to remote repository.
img: git-tag.png
fig-caption: # Add figcaption (optional)
tags: [git, git tag, tags in git, push tag]
---

Tags trong Git thường được dùng để đánh nhãn cho các commits cụ thể nào đó. Ví dụ như đánh dấu thời điểm release chẳng hạn.

Bài viết này sẽ hướng dẫn bạn tất tần tật các lệnh liên quan tới tags trong Git như: tạo mới tag, list tag, xóa tag, push tag lên remote repository hay như là show ra toàn bộ các tag name gần đây cũng như là có bao nhiêu các commits đã được tạo trước đó.

### Git Create Tag

Tạo 1 tag "_lightweight_" ở nhánh hiện tại:

```console
$ git tag <tag_name>
```

Để tạo tag "_annotated_" thì thêm option `-a` vào lệnh trên:

```console
$ git tag <tag_name> -a
```

Tạo luôn message khi thêm chú thích (thay vì xuất hiện dấu nhắc):

```console
$ git tag <tag_name> -a -m "Your message"
```

Hoặc

```console
$ git tag <tag_name> -am "Your message"
```

> Giải thích _annotated_ vs _lightweight_: Tag được tạo với option `-a` được gọi là "_annotated_" tag. Còn tag được tạo không có message được gọi là "_lightweight_" tag. Các tags "_annotated_" có ý nghĩa đối với việc release trong khi các tag "_lightweight_" dùng với mục đích riêng tư hoặc đơn giản là đánh nhãn tạm thời. Vì lý do này mà các lệnh đặt tên đối tượng (như `git describe`) sẽ mặc định bỏ qua các tag "_lightweight_".

Bất cứ lúc nào bạn có thể check các commit được tag hay không hay như các tag gần đây nhất và có bao nhiêu commits được tạo trước đó.

```console
$ git describe
v1.0.1
   |--------------- the current commit is tagged with this tag name

$ git describe
v1.0.3-7-g89fbf84
   |   |     |----- commit hash
   |   |----------- number of commits since the last tag
   |--------------- the most recent tag name
```

Mặc định, lệnh `git describe` bỏ qua các tag "_lightweight_"

Nếu bạn muốn xem toàn bộ tags thì chạy lệnh:

```console
$ git describe --tags
```

### List Tags in Git

Trước khi list tags thì cần đảm bảo toàn bộ tags mới nhất trên remote repository được kéo về local.

Mặt khác, nếu không kéo về thì vẫn có thể xem được danh sách tags trên remote repository.

Trước hết là kéo toàn bộ tags về local:

```console
$ git fetch --all --tags --prune
```

Xem danh sách tag:

```console
$ git tag
```

Xem tags cùng với dòng đầu tiên của message chú thích hoặc commit message đầu tiên nếu như tag không được chú thích.

```console
git tag -n
```

Xem tag với 5 dòng đầu tiên của message chú thích hoặc commit:

```console
git tag -n5
```

Xem toàn bộ tags với mẫu có sẵn. Ví dụ liệt kê tất cả các tags bắt đầu bằng `v`:

```console
$ git tag -l "v*"
```

Nếu không muốn kéo tags từ remote về, chạy lệnh:

```console
$ git ls-remote --tags
```

### Git Push Tag

> Push tag to remote: Tag được tạo ở local sẽ bao gồm trạng thái hiện tại của nhánh. Mặc định khu push nhánh lên remote repository thì tag sẽ không được push cùng. Vì vậy cần định nghĩa rõ ràng các tags cần thiết nên được push lên remote.

Push toàn bộ tags lên remote:

```console
$ git push origin --tags
```

Push 1 tag cụ thể lên remote:

```console
$ git push origin <tag_name>
```

### Git Delete Tag

Bạn có thể sử dụng các lệnh sau đây để xóa tag dưới local hoặc trên remote

#### Delete Remote Git Tag

> Info: Vì Git có 1 tag namespace và 1 branch namespace, vì thế mà bạn có thể sử dụng tên giống nhau cho branch và tag. Để chắc chắn bạn không vô tình xóa đi 1 branch thay vì xóa tag thì tốt hơn là chỉ định toàn bộ các _ref_ trong khi xóa tag.

Xóa tag trên remote:

```console
$ git push origin :refs/tags/<tag_name>
```

Cách khác:

```console
$ git push -d origin <tag_name>
```

Hoặc

```console
$ git push --delete origin <tag_name>
```

#### Remove Local Git Tag

Xóa tag dưới local

```console
$ git tag -d <tag_name>
```

Hoặc

```console
$ git tag --delete <tag_name>
```