$(".read-more").click(function() {
    $(this).closest(".post-preview").hide();
    $(this).closest(".row").children('.post-content').show();
});

$('.close-post').click(function() {
    $(this).closest(".post-content").hide();
    $(this).closest(".row").children('.post-preview').show();
});