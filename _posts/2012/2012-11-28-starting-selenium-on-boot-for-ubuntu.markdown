---
layout: post
title: "Starting Selenium on Boot for Ubuntu"
date: "2012-11-28 05:38"
author: Jason Hardin
pageclass: programming
category: programming
tags:
  - Ubuntu
  - commandline
  - programming
  - bash
  - selenium
---

I found a post (but lost the link) on how to configure ubuntu to automatically start a selenium stand alone server:

I have modified that script in the init.d directory to load up a Firefox profile, which is what I use to stream line Firefox for testing. My Firefox profile is based on this blog post

My script looks like:

{% highlight bash linenos%}
#!/bin/bash

case "${1:-''}" in
    'start')
        if test -f /tmp/selenium.pid
        then
            echo "Selenium is already running."
        else
		    java -Djava.security.egd=file:/dev/urandom -jar /usr/lib/selenium/selenium-server.jar -firefoxProfileTemplate /home/moodlerooms/selenium/firefox > /var/log/selenium/selenium-output.log 2> /var/log/selenium/selenium-error.log & echo $! > /tmp/selenium.pid

            echo "Starting Selenium..."

            error=$?
            if test $error -gt 0
            then
                echo "${bon}Error $error! Couldn't start Selenium!${boff}"
            fi
        fi
    ;;
    'stop')
        if test -f /tmp/selenium.pid
        then
            echo "Stopping Selenium..."
            PID=`cat /tmp/selenium.pid`
            kill -3 $PID
            if kill -9 $PID ;
            then
                sleep 2
                test -f /tmp/selenium.pid && rm -f /tmp/selenium.pid
            else
                echo "Selenium could not be stopped..."
            fi
        else
            echo "Selenium is not running."
        fi
    ;;
    'restart')
        if test -f /tmp/selenium.pid
        then
            kill -HUP `cat /tmp/selenium.pid`
            test -f /tmp/selenium.pid && rm -f /tmp/selenium.pid
            sleep 1
            java -Djava.security.egd=file:/dev/urandom -jar /usr/lib/selenium/selenium-server.jar -firefoxProfileTemplate /home/moodlerooms/selenium/firefox > /var/log/selenium/selenium-output.log 2> /var/log/selenium/selenium-error.log & echo $! > /tmp/selenium.pid
            echo "Reload Selenium..."
        else
            echo "Selenium isn't running..."
        fi
    ;;
    *)      # no parameter specified
        echo "Usage: $SELF start|stop|restart|reload|force-reload|status"
        exit 1
    ;;
esac
{% endhighlight %}

I had some issues with this on the server. Because the root user was loading the server I am not sure that my specific user’s crontab had permissions to send requests. I ended up going with a much simpler startup script for the user because the user is auto logging in at startup. The startup script is:
{% highlight bash %}
java -Djava.security.egd=file:/dev/urandom -jar /usr/lib/selenium/selenium-server.jar -firefoxProfileTemplate /home/moodlerooms/selenium/firefox > /var/log/selenium/selenium-output.log 2> /var/log/selenium/selenium-error.log & echo $! > /tmp/selenium.pid
{% endhighlight %}
