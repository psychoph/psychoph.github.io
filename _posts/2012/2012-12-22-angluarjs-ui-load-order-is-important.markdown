---
layout: post
title: "Angluarjs UI Load Order is Important"
date: "2012-12-22 05:35"
author: Jason Hardin
pageclass: programming
category: programming
tags:
  - commandline
  - programming
  - Angularjs
---

I ran into some issues trying to get the [angular-ui](http://angular-ui.github.com/) working with the modal. It turns out that you have to include the JavaScript libraries in a very specific order, which is not mentioned in the readme. The order is as follows:

{% highlight JavaScript linenos %}
<script src="http://code.jquery.com/jquery-latest.js"></script>
<script src="http://code.jquery.com/ui/1.9.2/jquery-ui.js"></script>
<script src="http://twitter.github.com/bootstrap/assets/js/bootstrap-modal.js"></script>
<script src="lib/angular/angular.js"></script>
<script src="lib/angular/angular-ui.min.js"></script>
{% endhighlight %}

This of course goes into the footer. If this is in the wrong order you get errors such as:

{% highlight JavaScript linenos %}
TypeError: Object [[object HTMLDivElement]] has no method 'modal'
{% endhighlight %}

I found the solution in a [google group post](https://groups.google.com/forum/#!msg/angular-ui/X-ySH3dlKHE/CRUI3xthozIJ)
