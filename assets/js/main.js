$(document).ready(function () {
    // Loading famous saying
    const famousSaying = [
        {
            text: "The man who comes back through the door in the wall will never be quite the same as the man who went out.",
            author: "Aldous Huxley",
        },
        {
            text: "Success is a lousy teacher. It seduces smart people into thinking they can’t lose.",
            author: "Bill Gates",
        },
        {
            text: "Don’t compare yourself with anyone in this world… if you do so, you are insulting yourself.",
            author: "Bill Gates",
        },
        {
            text: "Your most unhappy customers are your greatest source of learning.",
            author: "Bill Gates",
        },
        {
            text: "Be nice to nerds. Chances are you’ll end up working for one.",
            author: "Bill Gates",
        },
        {
            text: "Life is not fair — get used to it!",
            author: "Bill Gates",
        },
        {
            text: "Patience is a key element of success.",
            author: "Bill Gates",
        },
        {
            text: "It’s fine to celebrate success, but it is more important to heed the lessons of failure.",
            author: "Bill Gates",
        },
        {
            text: "To win big, you sometimes have to take big risks.",
            author: "Bill Gates",
        },
        {
            text: "I choose a lazy person to do a hard job. Because a lazy person will find an easy way to do it.",
            author: "Bill Gates",
        },
        {
            text: "If you think your teacher is tough, wait till you get a boss.",
            author: "Bill Gates",
        },
    ];
    let blockQuote = random_item(famousSaying);
    $(".famous-saying__text").html(blockQuote.text);
    $(".famous-saying__author").html(blockQuote.author);

    setInterval(() => {
        let blockQuote = random_item(famousSaying);
        $(".famous-saying__text").html(blockQuote.text);
        $(".famous-saying__author").html(blockQuote.author);
    }, 30000);
});

// Next and previous page by arrow key
$("html").on("keyup", function (e) {
    if (e.keyCode == 39) {
        // next page
        if ($(".older-posts").length > 0) {
            location.href = $(".older-posts").attr("href");
        }
    } else if (e.keyCode == 37) {
        // previous page
        if ($(".newer-posts").length > 0) {
            location.href = $(".newer-posts").attr("href");
        }
    }
});

// =====================
// ===== FUNCTIONS =====
// =====================

/**
 * Get random element from an array
 *
 * @param   {Array}  items  An array
 *
 * @return  {any}         Element of array
 */
function random_item(items) {
    return items[Math.floor(Math.random() * items.length)];
}
