function togglePost() {
    event.preventDefault();
    $(this).closest('.post').children('.post-content').slideToggle();
    $(this).closest(".post").children('.post-preview').toggle();
}

$('.post-read-more').click(togglePost());
$('.post-close').click(togglePost());
$('.post-content-header').click(togglePost());
$('.post-preview-header').click(togglePost());
