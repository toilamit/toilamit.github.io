---
layout: post
title: Show prompt for "Yes/No" confirmation in Bash Script
categories: [Linux, Bash]
date: 2020-08-12 09:00:00 +0700
description: 
img: # Add image post ex: viet-dep-zai.jpg (optional)
fig-caption: # Add figcaption (optional)
tags: [linux, bash, bash script]
---

Một số trường hợp khi cài đặt hoặc chạy lệnh trong bash script. Bạn sẽ được yêu cầu nhập câu trả lời `Yes` hoặc `No` để tiếp tục thực hiện lệnh.

Vậy làm sao để hiển thị các yêu cầu người dùng nhập vào? Ví dụ, bạn muốn hiển thị xác nhận "Are you sure? (Y/n)" trước khi tiếp tục thực hiện các lệnh tiếp theo.

Rất đơn giản, bài viết sẽ hướng dẫn bạn 3 cách để thực hiện điều này trong bash script.

## Prompt To Continue In Bash
Sử dụng lệnh `read` để tiếp tục thực hiện các lệnh trong bash script.

```bash
read -p "Are you sure? " -n 1 -r
echo    # (optional) move to a new line
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    exit 1
fi
echo "Do stuff ..."
```

## Simple “Yes/No” Dialog In Bash
Cách này khá là phổ biến để yêu cầu người dùng xác nhận.

Kết hợp cả lệnh `read` và `case` trong bash script

```bash
while true; do
    read -p "Do you wish to install this program?" yn
    case $yn in
        [Yy]* ) make install; break;;
        [Nn]* ) exit;;
        * ) echo "Please answer yes or no.";;
    esac
done
```

## Select From “Yes/No” Menu In Bash
Cách khác đơn giản hơn là sử dụng lệnh `select`

```bash
echo "Do you wish to install this program?"
select yn in "Yes" "No"
case $yn in
    Yes ) make install;;
    No ) exit;;
esac
```

## Ref
- <a href="http://kb.ictbanking.net/article.php?id=483&oid=5" target="_blank">http://kb.ictbanking.net/article.php?id=483&oid=5</a>