---
layout: post
title: Serials Javascript Style Guide – Testing
categories: [Javascript]
date: 2019-06-07 09:00:00 +0700
description: 
img: # Add image post ex: viet-dep-zai.jpg (optional)
fig-caption: # Add figcaption (optional)
tags: [js, js style]
---

## Testing

<a name="testing--yup"></a><a name="28.1"></a>
### [30.1](#testing--yup) **Yup.**

```javascript
function foo() {
  return true;
}
```

<a name="testing--for-real"></a><a name="28.2"></a>
### [30.2](#testing--for-real) **No, but seriously**:
- Cho dù bạn sử dụng bất kỳ framework test nào, thì bạn cũng nên viết test!
- Cố gắng viết nhiều hàm thuần túy và giảm thiểu xảy ra các đột biến.
- Hãy cẩn trọng với stubs và mocks - chúng có thể làm tests của bạn dễ vỡ hơn.
- Chúng ta chủ yếu sử dụng [`mocha`](https://www.npmjs.com/package/mocha) và [`jest`](https://www.npmjs.com/package/jest). [`tape`](https://www.npmjs.com/package/tape) cũng được sử dụng ngẫu nhiên các modules nhỏ và riêng biệt.
- Cố gắng test bao phủ 100%.
- Bất cứ khi nào sửa bug, _hãy viết regression test_. Một bug fixed không có regression test thì hầu như chắc chắn lại xảy ra bug.

Tổng hợp [Serial Javascript Style Guide](/2019/05/17/serials-javascript-style-guide/)