/* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
var disqus_shortname = 'stringonafinger'; // required: replace example with your forum shortname

$(document).ready(function() {
  $('.show-comments').on('click', function() {
    // ajax request to load the disqus javascript
    $.ajax({
      type: "GET",
      url: "//" + disqus_shortname + ".disqus.com/embed.js",
      dataType: "script",
      cache: true
    });
    // hide the button once comments load
    $(this).fadeOut();
  });
});
