---
layout: post
title: Serials Javascript Style Guide
categories: [Javascript]
date: 2019-05-27 09:00:00 +0700
description: 
img: # Add image post ex: viet-dep-zai.jpg (optional)
fig-caption: # Add figcaption (optional)
tags: [js, js style]
---

<p>Chào các bạn, có lẽ Javascript quá quen thuộc với mọi người và những sức mạnh cũng như đóng góp của JS cho nền công nghệ thế giới như thế nào rồi phải không.</p>

<p>JS từ thuở sơ khai là ngôn ngữ script chỉ dành riêng cho phía client và chạy dưới browser, giờ đây với sự đóng góp mạnh mẽ của các nhà phát triển, JS đã dần quen thuộc và góp mặt vào cả phía Server (NodeJS) cũng như lấn sân sang cả các nền tảng khác ngoài web như App (ReactNative, Flutter...)</p>

<p>Sức mạnh và lợi ích của JS là không thể bàn cãi và chúng ta đang có 1 công cụ cực kỳ hữu ích và mạnh mẽ để phát triển. Tuy nhiên JS tốt là thế nhưng cũng như các ngôn ngữ khác, nếu chỉ đơn thuần là code để chạy thôi thì người ta gọi là code không có tâm. Lập trình viên có thể khai báo biến, hàm, hằng 1 cách vô tư thoải mái nhưng không hề để ý gì đến format code, đến performance của ứng dụng. Điều đó khiến cho code rất rối, rất bẩn và rất khó maintain.</p>

<p>Nhận thấy cần có những sự điều chỉnh hay tạo ra 1 convention cho riêng JS, serial này sẽ dẫn các bạn từng bước để hiểu và sử dụng các convention 1 cách hiệu quả và hữu ích.</p>

<p>Tôi hi vọng serial bài viết về Javascript Style Guide sẽ giúp các bạn có được code format chuẩn và dễ maintain.</p>

<p>Danh sách style guide:</p>

<ul>
    <li><a href="/2019/05/17/serials-javascript-style-guide-type/">Types</a></li>
    <li><a href="/2019/05/24/serials-javascript-style-guide-references/">References</a></li>
    <li><a href="/2019/05/27/serials-javascript-style-guide-objects/">Objects</a></li>
    <li><a href="/2019/05/27/serials-javascript-style-guide-arrays/">Arrays</a></li>
    <li><a href="/2019/05/27/serials-javascript-style-guide-destructuring/">Destructuring</a></li>
    <li><a href="/2019/05/27/serials-javascript-style-guide-strings/">Strings</a></li>
    <li><a href="#functions">Functions</a></li>
    <li><a href="#arrow-functions">Arrow Functions</a></li>
    <li><a href="#classes--constructors">Classes &amp; Constructors</a></li>
    <li><a href="#modules">Modules</a></li>
    <li><a href="#iterators-and-generators">Iterators and Generators</a></li>
    <li><a href="#properties">Properties</a></li>
    <li><a href="#variables">Variables</a></li>
    <li><a href="#hoisting">Hoisting</a></li>
    <li><a href="#comparison-operators--equality">Comparison Operators &amp; Equality</a></li>
    <li><a href="#blocks">Blocks</a></li>
    <li><a href="#control-statements">Control Statements</a></li>
    <li><a href="#comments">Comments</a></li>
    <li><a href="#whitespace">Whitespace</a></li>
    <li><a href="#commas">Commas</a></li>
    <li><a href="#semicolons">Semicolons</a></li>
    <li><a href="#type-casting--coercion">Type Casting &amp; Coercion</a></li>
    <li><a href="#naming-conventions">Naming Conventions</a></li>
    <li><a href="#accessors">Accessors</a></li>
    <li><a href="#events">Events</a></li>
    <li><a href="#jquery">jQuery</a></li>
    <li><a href="#ecmascript-5-compatibility">ECMAScript 5 Compatibility</a></li>
    <li><a href="#ecmascript-6-es-2015-styles">ECMAScript 6+ (ES 2015+) Styles</a></li>
    <li><a href="#standard-library">Standard Library</a></li>
    <li><a href="#testing">Testing</a></li>
    <li><a href="#performance">Performance</a></li>
    <li><a href="#resources">Resources</a></li>
    <li><a href="#in-the-wild">In the Wild</a></li>
    <li><a href="#translation">Translation</a></li>
    <li><a href="#the-javascript-style-guide-guide">The JavaScript Style Guide Guide</a></li>
    <li><a href="#chat-with-us-about-javascript">Chat With Us About JavaScript</a></li>
    <li><a href="#contributors">Contributors</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#amendments">Amendments</a></li>
</ul>

<p>Nếu có bất kỳ ý kiến nào hãy comment, like và share nếu như bài viết hữu ích.</p>
