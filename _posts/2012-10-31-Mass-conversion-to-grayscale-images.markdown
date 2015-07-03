---
layout: post
title: "Mass conversion to grayscale images"
date: 2012-10-31 22:28:00
categories:
---

Found this post on [creating grayscale copies of all in a directory images using imagemagick](http://da.vidr.cc/2008/09/29/converting-images-to-grayscale-in-linux-with-imagemagick/). The method is pretty awesome. The command line code is (in case the post gets lost at some point):


{% highlight text %}
 for i in *.jpg; do convert $i -colorspace Gray bw/$i; done
{% endhighlight %}