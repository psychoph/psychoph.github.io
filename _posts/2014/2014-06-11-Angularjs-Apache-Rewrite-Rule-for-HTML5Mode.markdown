---
layout: post
title: "Angularjs Apache Rewrite Rule for HTML5Mode"
date: 2014-06-11 19:39:00
categories:
  - programming
tags:
  - programming
  - code
  - apache
  - angluarjs
author: "Jason Hardin"
pageclass: programming
redirect_from: "/Angularjs-Apache-Rewrite-Rule-for-HTML5Mode/"
---
I found that as I was working on an [Angularjs](https://angularjs.org/) project that if you are not using Nodejs there are some rules you need to create to use Angularjs’s html5mode. For Apache you need to add the following rewrite rule to a .htaccess file or virtualhost.

{% highlight conf linenos %}
<ifModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} !index
    RewriteRule (.*) index.html [L]
</IfModule>
{% endhighlight %}

I credit this to Joss Crowcroft with his [post](http://www.josscrowcroft.com/2012/code/htaccess-for-html5-history-pushstate-url-routing/) that I found on stackoverflow.
