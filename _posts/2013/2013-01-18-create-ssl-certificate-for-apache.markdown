---
layout: post
title: "Create SSL Certificate for Apache"
date: "2013-01-18 05:27"
author: Jason Hardin
category: programming
tags:
  - image processing
  - commandline
  - programming
  - imagemagik
pageclass: programming
---

I wanted to record the process I use to generate self signed ssl certificates. I took it from [http://www.akadia.com/services/ssh_test_certificate.html](http://www.akadia.com/services/ssh_test_certificate.html).

{% highlight bash linenos %}
sudo openssl genrsa -des3 -out pma.key 1024
sudo openssl req -new -key pma.key -out pma.csr
sudo cp pma.key pma.key.org
sudo openssl rsa -in pma.key.org -out pma.key
sudo openssl x509 -req -days 3650 -in pma.csr -signkey pma.key -out pma.crt
{% endhighlight %}

Then my virtual host looks like:

{% highlight conf linenos %}
<VirtualHost *:80>
    ServerAdmin admin@localhost.com
    DocumentRoot "/var/www/baseapp_apm/app"
    ServerName server
    ServerAlias server
    ErrorLog "/var/log/apache2/server-error.log"
    CustomLog "/var/log/apache2/server-access.log" common
    <Directory /var/www/baseapp_apm/app/server/>
       Options FollowSymLinks
       AllowOverride FileInfo
   </Directory>
</VirtualHost>

<IfModule mod_ssl.c>
<VirtualHost *:443>
    ServerAdmin admin@localhost.com
    DocumentRoot "/var/www/baseapp_apm/app"
    ServerName server
    ServerAlias server
    ErrorLog "/var/log/apache2/server-error.log"
    CustomLog "/var/log/apache2/server-access.log" common

    <Directory /var/www/baseapp_apm/app/server/>
        Options FollowSymLinks
        AllowOverride FileInfo
    </Directory>

    SSLEngine on
    SSLCipherSuite ALL:!ADH:!EXPORT56:RC4+RSA:+HIGH:+MEDIUM:+LOW:+SSLv2:+EXP:+eNULL
    SSLCertificateFile "/etc/ssl/localcerts/server.crt"
    SSLCertificateKeyFile "/etc/ssl/localcerts/server.key"
</VirtualHost>
</IfModule>
{% endhighlight %}
