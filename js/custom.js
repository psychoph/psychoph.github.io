$(".post-read-more").click(function() {
    $(this).closest(".post-preview").hide();
    $(this).closest(".post").children('.post-content').show();
});

$('.close-post').click(function() {
    $(this).closest(".post-content").hide();
    $(this).closest(".post").children('.post-preview').show();
});