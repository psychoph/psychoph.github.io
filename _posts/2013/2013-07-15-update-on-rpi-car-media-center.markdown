---
layout: post
title: "Update on RPI Car Media Center"
date: "2013-07-15 16:30"
author: Jason Hardin
pageclass: diy
categories:
  - media
  - raspberry pi
  - diy
tags:
  - media
  - raspberry pi
  - diy
  - car
---
Less than perfect success on the RPi Car media center. We ran into a snag within the first 30 minutes with the cell phone recharging battery died. After further playing with the battery the charging connection seems really finicky. The charging USB cable has to be connected at a very specific angle to actually recharge the battery. If the battery isn’t charging then the system stops working once the battery is drained. I had changed the configuration as well to have the hard drive powered off the battery to keep it running when the car turned off. This of course drained the battery even faster.

Luckily Xbian doesn’t complain that is was not started and stopped correctly, Raspbmc does. I was therefore able to salvage the project by simplifying the design down to just the harddrive, WiFi dongle, powered USB hub and WiFi hotspot on the cell phone. I still had issues randomly when I think the cell phone couldn’t find 3g coverage and so XBMC lost internet. I am still not exactly sure on this issue. So far however the process works fine with the simplified setup because Xbian boots a lot quicker.
