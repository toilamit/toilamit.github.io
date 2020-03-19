Serials Javascript Style Guide – jQuery

## jQuery

<a name="jquery--dollar-prefix"></a><a name="25.1"></a>
### [Dollar prefix](#jquery--dollar-prefix) 
Các đối tượng jQuery bắt đầu với dấu `$`.

```javascript
// bad
const sidebar = $('.sidebar');

// good
const $sidebar = $('.sidebar');

// good
const $sidebarBtn = $('.sidebar-btn');
```

<a name="jquery--cache"></a><a name="25.2"></a>
### [Cache](#jquery--cache) 
Cache jQuery lookups.

```javascript
// bad
function setSidebar() {
  $('.sidebar').hide();

  // ...

  $('.sidebar').css({
    'background-color': 'pink',
  });
}

// good
function setSidebar() {
  const $sidebar = $('.sidebar');
  $sidebar.hide();

  // ...

  $sidebar.css({
    'background-color': 'pink',
  });
}
```

<a name="jquery--queries"></a><a name="25.3"></a>
### [Queries](#jquery--queries) 
Với các truy vấn DOM sử dụng Cascading `$('.sidebar ul')` hoặc parent > child `$('.sidebar > ul')`. [jsPerf](http://jsperf.com/jquery-find-vs-context-sel/16)

<a name="jquery--find"></a><a name="25.4"></a>
### [Find](#jquery--find) 
Sử dụng `find` với các truy vấn object jQuery giới hạn.

```javascript
// bad
$('ul', '.sidebar').hide();

// bad
$('.sidebar').find('ul').hide();

// good
$('.sidebar ul').hide();

// good
$('.sidebar > ul').hide();

// good
$sidebar.find('ul').hide();
```

Tổng hợp [Serial Javascript Style Guide](/2019/05/17/serials-javascript-style-guide/)