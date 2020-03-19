---
layout: post
title: Hướng dẫn cài đặt Flutter trên MacOS
date: 2019-09-12 11:37:00 +0700
description: 
img: # Add image post ex: viet-dep-zai.jpg (optional)
fig-caption: # Add figcaption (optional)
tags: [flutter, dart]
---
## Cài đặt flutter

### Clone từ github

```
git clone git@github.com:flutter/flutter.git
```

### Thêm biến môi trường

Kiểm tra bằng `echo $PATH`

Thêm biến môi trường:

```
export PATH=`pwd`/flutter/bin:$PATH
```

Kiểm tra các plugin, và thiết bị đã kết nối bằng lệnh

```
flutter doctor
```

Trường hợp có dấu `!` và `x` thì tức là đang thiếu plugin nên là cứ làm theo hướng dẫn cài đặt

### Cài đặt `homebrew` để quản lý các package trên MacOS

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Sau khi cài xong có thể cập nhật các package trên MacOS bằng lệnh

```
brew update
```

### Cài thư viện libimobiledevice để communicate với các thiết bị

```
brew install --HEAD libimobiledevice
```

### Tạo mới app đầu tiên

```
flutter create myapp
```

Kiểm tra các thiết bị đã được kết nối

```
flutter devices
```

### Chạy ứng dụng

Di chuyển vào thư mục `myapp`

Chạy với thiết bị đã kết nối

```
flutter run
```

Trường hợp có nhiều hơn 2 devices thì dùng lệnh

```
flutter run -d <device ID>
```

Sau khi accept tất cả thì mở xcworkspace bằng XCode lên:

```
open ios/Runner.xcworkspace
```

Sau đó allow tài khoản developer lên, sau đó chạy bình thường trên thiết bị thật hoặc similator

### Cap nhat cac package da khai bao trong file pubspec.yaml

```
flutter packages get
```

### Clean
```
flutter clean
```

## Release Android
### Build apk release
```
flutter build apk --release
```

Buld with build-number:

```
flutter build apk --release --build-number=3 
```

### Build app bundle
```
flutter build appbundle
```

## Release iOS
