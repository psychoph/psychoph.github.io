$(".post-read-more").click(function() {
    $(this).closest(".post-preview").hide();
    $(this).closest(".post").children('.post-content').slidedown();
});

$('.post-close').click(function() {
    $(this).closest(".post-content").slideup();
    $(this).closest(".post").children('.post-preview').show();
});