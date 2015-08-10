---
layout: post
title: "Grayscale All Images in a Directory With Imagemagick"
date: "2012-10-31 05:40"
author: Jason Hardin
pageclass: programming
category: programming
tags:
  - image processing
  - programming
  - imagemagik
---

Below is a shell script to grayscale all gif images in a directory and save them as pngs using ImageMagick. I used this to convert all Moodle plugin icons to grayscale for Moodlerooms grayscale icon packs.

{% highlight bash linenos%}
#!/bin/bash

update (){
	cd $1
	pwd
	for i in `ls $1`
	do
		if [ -d $1/$i ]
		then
			echo "Updating $i "
			cd $i
			for f in `ls .`;
			do
				convert $f -colorspace Gray ${f%.gif}.png
				rm $f
			done
			cd ..
		fi
	done
}

if [ "$1" == "" ]; then
	update .
else
	update $1
fi
{% endhighlight %}
