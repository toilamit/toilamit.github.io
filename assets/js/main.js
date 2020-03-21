$(document).ready(function(){
    var sjs = SimpleJekyllSearch({
        searchInput: document.getElementById('search-input'),
        resultsContainer: document.getElementById('results-container'),
        json: '/search.json'
      })

    console.log(sjs)
  
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
     
    var labelID;

    $('label').click(function() {
        labelID = $(this).attr('for');
        $('#' + labelID).toggleClass('active');
    });
})