---
layout: post
title: "Z-index Article for Web Developers"
date: "2013-08-30 20:44"
author: Jason Hardin
pageclass: programming
category: programming
tags:
  - CSS
  - programming
---
Mary Evans posted a link to [Phill Walton’s What No One Told You About Z-Index](http://philipwalton.com/articles/what-no-one-told-you-about-z-index/) in the [Moodle forums](https://moodle.org/mod/forum/discuss.php?d=235723#p1026064). It is a very good read about how z-index is actually specified to work by the w3c. A lot of stuff I didn’t realize, specifically around stacking contexts and opacity.

Based on Mary’s post I find myself wondering if opacity assigned via CSS is a good way to go or if in most cases a background assigned and rgba color is a better solution. With a background you are less likely to get hit by all of the opacity issues but you also have less browser support. The other issue/benefit with a background color is that you don’t get the opacity inheritance, meaning children aren’t opaque.

In the end rgba only works in places where you can use a background. It doesn’t work for opaque images like in the case of only wanting actions links to show completely on hover. Of course this could be handled in many other ways too.
