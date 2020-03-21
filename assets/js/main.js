// Next and previous page by arrow key
$('html').on('keyup', function(e) {
    if (e.keyCode == 39) {
        // next page
        if ($('.older-posts').length > 0) {
            location.href = $('.older-posts').attr('href')
        }

    } else if (e.keyCode == 37) {
        // previous page
        if ($('.newer-posts').length > 0) {
            location.href = $('.newer-posts').attr('href')
        }
    }
    
})