---
layout: post
title: PHP sort array by key based on other array
permalink: /php/sort-array-by-key-based-on-other-array
date: 2019-05-23 15:49:00 +0700
description: 
img: # Add image post ex: viet-dep-zai.jpg (optional)
fig-caption: # Add figcaption (optional)
tags: [php, array sort]
---
`asort` hoặc `usort` có thể làm tốt nhiệm vụ sắp xếp mảng trong PHP, nhưng sẽ như thế nào nếu bạn thực sự muốn sort theo custom key?

Tôi có một ví dụ mảng:

```php
$animals = [
    'dog' => ['Pop', 'Milu', 'Reck'],
    'cat' => ['Kitty', 'Can', 'Suneo', 'Tom'],
    'mouse' => ['Mickey', 'Jerry', 'Donal'],
];
```

Và tôi muốn sắp xếp lại theo thứ tự như sau:

```php
$animals = [
    'dog' => ['Pop', 'Milu', 'Reck'],
    'mouse' => ['Mickey', 'Jerry', 'Donal'],
    'cat' => ['Kitty', 'Can', 'Suneo', 'Tom'],
];
```

Nếu như dùng `asort` kết quả sẽ là:

```php
$animals = [
    'mouse' => ['Mickey', 'Jerry', 'Donal'],
    'dog' => ['Pop', 'Milu', 'Reck'],
    'cat' => ['Kitty', 'Can', 'Suneo', 'Tom'],
];
```

Trong khi `usort` thì sắp xếp theo value. Như vậy cả 2 trường hợp đều không cho ra kết quả mong muốn.

Để có kết quả sort mong muốn, bạn có thể dùng tip sau:

```php
$animalsSorted = array_replace(array_flip(array('dog', 'mouse', 'cat')), $animals);
```

Khi ấy kết quả sẽ là:

![Sort result](https://toilamit.com/wp-content/uploads/2019/05/php-sort-array-by-key-based-on-other-array.png "Sort array by key based on other array")
