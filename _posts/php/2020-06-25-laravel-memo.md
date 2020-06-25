---
layout: post
title: Laravel Memo
categories: [PHP, Laravel]
date: 2020-06-25 09:00:00 +0700
description: 
img: laravel.jpg
fig-caption: # Add figcaption (optional)
tags: [php, laravel]
---

Memo những điểm cơ bản của Laravel. Không đầy đủ nhưng là cơ sở để bắt đầu với Laravel.

## Laravel
- Chính xác là 1 framework của PHP
- Nói đến PHP là nói đến Laravel. Rất phổ biến rộng rãi

Một số điểm bắt đầu lưu ý khi làm việc với Laravel

### Debug tool
```
composer require barryvdh/laravel-debugbar
```

### Artisan
Tại thư mục root dự án

```
php artisan ~~~
```

### Model

Tạo model
```
php artisan make:model Models/name
```

Tạo model đồng thời với Controller và file Migration
```
php artisan make:model Models/name -mc
```

Tạo model và file Migration
```
php artisan make:model Models/name -m
```

### Migration
Tạo bảng migration lưu lịch sử thay đổi DB

Tạo file migration
```
php artisan make:migration create_names_table
```

File được lưu vào thư mục `database`

Tham khảo cách thêm cột: https://readouble.com/laravel/5.5/ja/migrations.html

Chạy migration
```
php artisan migrate
```

Thêm mới cột
```
php artisan make:migration add_column_name_to_table_name_table —table=table_name->after('column_name');
```

### Controller
Xử lý logic

Tạo controller
```
php artisan make:controller controller_name
```

Lệnh trên sẽ tạo 1 public method trong class

Hiển thị từ view
```php
// ***Controller.php
return view('view_folder.view_file');
```

`Request` luôn là tham số đầu tiên trong phương thức
```php
// ***Controller.php
public function store(Request $request)
    {
        $your_name=$request->input('your_name');
    }
```

### View
Tên file view có dạng `***.blade.php`.

Gắn link vào thuộc tính `href` của thẻ `a`
```php
// ***.blade.php
<a href="{ { route('view-folder-name/file-name') } }"></a>
```
Gắn link vào thuộc tính `action` của `form`

```php
// ***.blade.php
<form method="POST" action="{ {route('view-folder-name/file-name')} }">
    //Chèn @csrf trong laravel khi dùng form
    @csrf
</form>
```

### Route
Tạo route đơn lẻ
```php
web.php
Route::get('view-folder-name/view-file-name','controller-name@method-in-controller');
```

Nhóm các route lại

```php
web.php
Route::group(['prefix'=>'view-folder-name','middleware'=>'auth'],function(){
    Route::get('***','controller-name@method-in-controller')->name('view-folder-name.view-file-name');
});
```

Xuất route ra file

```
php artisan route:list > file-name.text
```

### Facades

Sử dụng các cú pháp get,select,where,groupby như của SQL

```php
// ***Controller.php
DB::table('table-name')->get();
```

#### Sử dụng query builder
```php
// ***Controller.php
use Illuminate\Support\Facades\DB; //sử dụng trong Controller
```

### Laravel UI
Sử dụng `js` và `sass`

Các chức năng login, signup

Tham khảo: https://www.techpit.jp/courses/laravel6-aws/lectures/13324326

### Japanese language
Copy [ja lang](https://github.com/minoryorg/laravel-resources-lang-ja) và cho vào thư mục `resource/lang/ja`

Kiểm tra locale là `ja` trong file `config/app.php`

```php
'locale' => 'ja',
```

## Tóm lại
Chỉ là memo về các chức năng chính của Laravel.

Muốn hiểu rõ hơn thì truy cập trang document của Laravel.

Chi tiết các bản release của Laravel ở [đây](https://laravel.com/docs/master/releases)
