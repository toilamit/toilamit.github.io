Serials Javascript Style Guide – Events

## Events

<a name="events--hash"></a><a name="24.1"></a>
### [Hash](#events--hash) 
Khi đính kèm dữ liệu payloads vào các sự kiện (cho dù là sự kiện DOM hoặc cái gì đó riêng biệt như sự kiện Backbone), thì truyền vào 1 object literal (được biết như là "hash") thay vì là 1 raw value. Điều này cho phép thêm mới dữ liệu mà không cần phải tìm lại và update lại dữ liệu theo mỗi sự kiện. Ví dụ: thay vì:

```javascript
// bad
$(this).trigger('listingUpdated', listing.id);

// ...

$(this).on('listingUpdated', (e, listingID) => {
  // do something with listingID
});
```

nên là:

```javascript
// good
$(this).trigger('listingUpdated', { listingID: listing.id });

// ...

$(this).on('listingUpdated', (e, data) => {
  // do something with data.listingID
});
```

Tổng hợp [Serial Javascript Style Guide](/2019/05/17/serials-javascript-style-guide/)