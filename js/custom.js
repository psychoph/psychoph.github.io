function togglePost(post) {
    event.preventDefault();
    post.closest('.post').children('.post-content').slideToggle();
    post.closest(".post").children('.post-preview').toggle();
}

$('.post-read-more').click(function(){togglePost($(this));});
$('.post-close').click(function(){togglePost($(this));});
$('.post-content-header').click(function(){togglePost($(this));});
$('.post-preview-header').click(function(){togglePost($(this));});
