---
title: Paqart Design
excerpt: New website for a creative workshop and group specialised in brand and packaging design.
url: http://paqartdesign.com/
img: paqart-2014.png
date: "2014-12-06"
worktags:
    - PHP
    - ProcessWire
    - Multilanguage
    - Design
    - Sitebuild
---

The previous website had some usability issues (big browser only, buggy navigation, separate content and portfolio images, etc) so the redesign was an important thing to do.

**One Page Layout**

I believe people would rather scroll a webpage instead of clicking on menu items to reveal subpages. That's why a one-page layout was used, as the quantity of content made that possible. Showcase of previous works are now right below the corresponding sections to give visual support to the content. There are jump-links to the main sections of the site and the main contact form is available from everywhere on the site. The website is also responsive.

**Optimizations**

Many optimization tricks were used to keep the size minimized:

-   lazy loading images, iframes, slilders and lightboxes
-   using subsets of webfonts instead of full stacks (using Fontello)
-   disabling extra features on smaller devices
-   merging and minimizing JavaScripts and stylesheets
-   shrinking images, CSS3 animations, htaccess tricks, etc.

As a result the website loads only about 700 kbytes when starting and even less on smaller devices. Thanks to lazy loading sliders and lightboxes, images are loaded only when the user requests them.

**Wired Up**

Originally we planned to use WordPress but because of its weak multilanguage support I started to look for a better solution. Finally found ProcessWire and that was the best thing that could happen. Even that I was new to the CMS I felt comfortable in it in a few days. I could concentrate on the actual task instead of trying getting WordPress to do something it wasn't designed to do.
