---
layout: post
title: "RPi XBMC Car Media Player"
date: "2013-07-08 20:36"
excerpt: "Ever since I purchased a Raspberry Pi I have tried to figure out what to do with it. Lately I have been trying to figure out how to make my kids in car DVD players work without forcing me to turn around in the car to change the DVD. I started a project to use a raspberry pi to create a RPi XBMC car media player."
excerpt-img: "/media/diy/xbmc_working.jpg"
author: Jason Hardin
pageclass: diy
---

Ever since I purchased a [Raspberry Pi](http://www.raspberrypi.org/) I have tried to figure out what to do with it. Lately I have been trying to figure out how to make my kids in car DVD players work without forcing me to turn around in the car to change the DVD. I started a project to use a raspberry pi to create a RPi XBMC car media player.

The project was a bear from the start, but I am going to write up what the final outcome was.

*Update: I removed the cellphone battery charger as it had a loose charging connection and failed. As long as I used Xbian I have had not problems without the charger*

## RPi XBMC Car Media Player Parts

<table>
<tbody>
<tr>
<th>Component</th>
<th>What I Used</th>
<th>Price</th>
</tr>
<tr>
<td>Raspberry Pi</td>
<td>[Raspberry Pi B](http://www.newark.com/jsp/search/productdetail.jsp?SKU=43W5302)</td>
<td>$35</td>
</tr>
<tr>
<td>Raspberry Pi case</td>
<td>[MULTICOMP – MC-RP001-WHT – ENCLOSURE, RASPBERRY PI, WHITE](http://www.newark.com/multicomp/mc-rp001-wht/enclosure-raspberry-pi-white/dp/07W8932)</td>
<td>$7.35</td>
</tr>
<tr>
<td>Class 10 SD card (recommend 8 gig for speed)</td>
<td>SAMSUNG 8GB Secure Digital High-Capacity (SDHC)</td>
<td>$6.99</td>
</tr>
<tr>
<td>3x MicroUSB to USB cable</td>
<td>Preowned</td>
<td>0</td>
</tr>
<tr>
<td>Powers USB Hub</td>
<td>[DLINK Dub-h7](http://www.dlink.com/us/en/home-solutions/connect/usb/dub-h7-7-port-usb-2-0-hub)</td>
<td>0</td>
</tr>
<tr>
<td>2x Car DVD player</td>
<td>[Philips PD9016/37 9-inch Portable LCD Dual DVD player](http://www.amazon.com/gp/product/B004PEIAD6/ref=oh_details_o01_s00_i00?ie=UTF8&amp;psc=1)</td>
<td>$159.99</td>
</tr>
<tr>
<td>2x Audio 3.5mm stereo male to 2x RCA male cable</td>
<td>Pre owned</td>
<td>0</td>
</tr>
<tr>
<td>Headphone Splitter</td>
<td>[Belkin Speaker and Headphone Splitter](http://www.amazon.com/gp/product/B000067RC4/ref=oh_details_o02_s00_i01?ie=UTF8&amp;psc=1)</td>
<td>$3.80</td>
</tr>
<tr>
<td>Female RCA audio video to male av specific to Car DVD players</td>
<td>Preowned</td>
<td>0</td>
</tr>
<tr>
<td>RCA Male to Dual RCA Female Adapter (for component video)</td>
<td>[C2G / Cables to Go 40650 RCA Male to Dual RCA Female Adapter (Black)](http://www.amazon.com/gp/product/B000M52X62/ref=oh_details_o02_s00_i00?ie=UTF8&amp;psc=1)</td>
<td>$1.94</td>
</tr>
<tr>
<td>2x RCA AV Male to 3.5mm male specific to the DVD player</td>
<td>1 [WennoW 3.5mm AV Cable for Philips Portable DVD Player](http://www.amazon.com/gp/product/B0079X30JE/ref=oh_details_o03_s00_i00?ie=UTF8&amp;psc=1) and 1 preowned</td>
<td>$9.98</td>
</tr>
<tr>
<td>WiFi Dongle</td>
<td>[Ralink RT5370 WiFi dongle](http://www.amazon.com/gp/product/B007BWFXYS/ref=oh_details_o03_s00_i00?ie=UTF8&amp;psc=1)</td>
<td>$8.99</td>
</tr>
<tr>
<td>2x Cigarette outlets in car</td>
<td>[Roadpro 12V, 2 Outlet Platinum Series Fused Cigarette Lighter Adapter with Short Cord](http://www.amazon.com/gp/product/B0016LE80K/ref=oh_details_o04_s00_i00?ie=UTF8&amp;psc=1)</td>
<td>$6.09</td>
</tr>
<tr>
<td>Cigarette to 110v Converter</td>
<td>Preowned</td>
<td>0</td>
</tr>
<tr>
<td>USB powered external hard drive (laptop based is best with USB connector)</td>
<td>[Vantec NexStar TX 2.5-Inch SATA to USB 2.0 External Hard Drive Enclosure](http://www.amazon.com/gp/product/B002JQNXZC/ref=oh_details_o07_s00_i00?ie=UTF8&amp;psc=1) and spare 128 Gb laptop harddrive</td>
<td>$9.99</td>
</tr>
<tr>
<td>Storage box that fits where you want to store the Raspberry Pi XBMC Media Player</td>
<td>13″ X 6″ X 4″ Plastic bin</td>
<td>$5</td>
</tr>
<tr>
<td>FoxFI or WiFi hotspot on cell phone</td>
<td>FoxFi with unlimited data</td>
<td>0</td>
</tr>
<tr>
<td>XBMC Remotee</td>
<td>[Yaste](https://play.google.com/store/apps/details?id=org.leetzone.android.yatsewidgetfree&amp;hl=en)</td>
<td>$4.99 for pro and supporting the app</td>
</tr>
<tr>
<td>XBMC</td>
<td>[Xbian](http://www.xbian.org/)</td>
<td>0 (donation)</td>
</tr>
<tr>
<td>Second Device for a remote</td>
<td>Preowned Motorola Xoom</td>
<td>0</td>
</tr>
<tr>
<td>Total</td>
<td></td>
<td>$241.34</td>
</tr>
</tbody>
</table>

## Software Setup

For the XBMC build for the RPi XBMC car media player I tried [Raspbmc](http://www.raspbmc.com/) initially but I had issue with warnings appearing when there was a accidental reboot. [Raspbmc](http://www.raspbmc.com/) also ended up not being as fast as [Xbian](http://www.xbian.org/). [Xbian](http://www.xbian.org/) has advanced video output configuration settings that let me stop the raspberry pi from sleeping. Both worked great with the Ralink RT5370 WiFi dongle and detected it the first time, both also worked with the android [Yatse app](https://play.google.com/store/apps/details?id=org.leetzone.android.yatsewidgetfree&hl=en).

For the installation of XBMC you will need to follow [Xbian](http://www.xbian.org/download/) or [Raspbmc’s](http://www.raspbmc.com/download/) installation instructions. I highly recommend a broadband hardwired connection and a keyboard and mouse for setup. After the installation is done you need to make some configuration changes to the XBMC to:

- Load up content from the hard drive
- Connect the WiFi dongle to your cellphones WiFi hotspot
- Update appearance
- Turn off Sleep Mode

### Load up Videos



### Connect the WiFi Dongle to Cellphone WiFi Hotspot

![]({{site.url}}/media/diy/xbmc_screenshot002.png){: .img-responsive  .center-block }

### Update Appearance

![]({{site.url}}/media/diy/xbmc_screenshot000.png){: .img-responsive  .center-block }

### Turn Off Sleep Mode

![]({{site.url}}/media/diy/xbmc_screenshot001.png){: .img-responsive  .center-block }

1. Turn on Xbian advanced
2. Under system check (they are towards the bottom)
3. HDMI ignore CEC init
4. HDMI disable CEC

![ Logitech G13 Keyboard Profile]({{site.url}}/media/diy/xbmc_screenshot002.png){: .img-responsive  .center-block }

## Custom AV Splitter Cable

Because each Portable DVD player that has an 3.5 mm AV in has a different ground configuration of the three bands on the 3.5 mm plug you need to make sure you get a male 3.5 mm to 3 RCA male cable that is specific to your DVD player. I found this out the hard way after trying a couple cheap cables. It was work the extra money (3 times the price) to know for sure the cable would work. The cable from the Raspberry Pi to the DVD players is not simple because the Raspberry Pi has a 3.5 mm stereo jack and a component video or an HDMI port. They just don’t’ make splitters for this, which I needed because I was mirroring onto 2 DVD screens. The cable configuration was as follows:

![]({{site.url}}/media/diy/RPICarMediaCentreWiring.svg){: .img-responsive  .center-block }

Once I had all the cables I used electrical tape to keep everything together. Since this was for a car with kids the cables has to be one solid rope without a lot of areas for little feet to disconnect things. Below is a picture of the final cable. It doesn’t look pretty at all but it is functional.

![]({{site.url}}/media/diy/xbmc_wiring.jpg){: .img-responsive  .center-block }

I ended up using cables that I had around the house except for the splitters. If you are buying everything new I recommend getting the same size wires for everything. Find RCA male to two female and head phone splitters that are the same length as well as 3.5mm to 2 RCA male splitters that are the same length as your RCA male to RCA male cables. It will cause a lot less headaches when you go to tape you wire together. I didn’t show the end as it is taped into the box and currently connected to my Raspberry Pi.

## Device Cable Connections

![]({{site.url}}/media/diy/RPI-Car-Media-Center-Device-Connections-Revised.svg){: .img-responsive  .center-block }

![]({{site.url}}/media/diy/xbmc_box.jpg){: .img-responsive  .center-block }

![]({{site.url}}/media/diy/xbmc_working.jpg){: .img-responsive  .center-block }
