---
layout: post
title:  "Gimp svg to png script"
date:   2012-08-23 16:53:55
category: programming
tags:
  - image processing
  - commandline
  - programming
  - imagemagik
pageclass: programming
---

Been working on icons for Moodlerooms mockups using Balsamiq and was pointed to [http://somerandomdude.com/work/iconic/](http://somerandomdude.com/work/iconic/) by a response to a comment I made.  Rather than reading the actual documentation after downloading the icons I looked for a way to convert the svg file to png files.  I then found http://porpoisehead.net/mysw/index.php?pgid=gimp_svg, which now seems defunct. While for gimp 2.2 I figured out the changes I needed to make, mostly to the -b option to be –batch= and the –batch-interpreter=plug-in-script-fu-eval. I never did get the shell script to work but ended up just using the shell for command that I fixed.  It looks like:

{% highlight text %}
 for f in *.svg; do gimp -i --batch="( svg-to-raster "$f" "${f%.svg}.png" 300 128 128)" --batch='(gimp-quit 0)'; done
{% endhighlight %}

Before that I ran:

{% highlight text %}
 for f in *.svg; do mv $f icon_$f; done
 {% endhighlight %}

This renames all the files to have the prefix icon_ which is needed by Balsamiq for icons that are located in the assets directory.