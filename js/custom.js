$(".post-read-more").click(function() {
    event.preventDefault();
    $(this).closest(".post-preview").hide();
    $(this).closest(".post").children('.post-content').slideToggle();
});

$('.post-close').click(function() {
    event.preventDefault();
    $(this).closest(".post-content").slideToggle();
    $(this).closest(".post").children('.post-preview').show();
});