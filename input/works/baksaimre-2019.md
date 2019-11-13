---
title: Imre Baksa portfolio redesign 2019
excerpt: Fresh portfolio site for Imre Baksa actor/director put together with Angular + ProcessWire.
url: https://baksaimre.hu/
img: baksaimre-2019.png
date: "2019-11-10"
worktags:
    - Angular
    - API
    - PHP
    - ProcessWire
    - Design
    - Sitebuild
---

I made the previous site with ProcessWire and after 3 years later it started to feel a bit clunky. It was not the CMS but mostly the frontend. At that time I was using jQuery with a masonry and other plugins. Posts came up in a lightboxed iframe which wasn't too fast either.

Recently I was digging more into Angular and this project seemed a great candidate for a rewrite. I kept ProcessWire as the API provider and used Angular for the frontend part. This setup may sound more complex as before (and it is), but the final result is faster in almost all aspects. The initial load takes about 5 seconds but after that the site doesn't require extra server roundtrips (except for the image and video assets).

The speed increase is partly due to Angular, and partly using some new features like the built-in lazy loading images (Chrome), lazy video embeds, replacing images with WebP format, etc.  The overall site weight went down by about 40% which was very impressive.

All this was reflected in page speed scores as well:

- GTmetrix: 100/96
- PageSpeed Insights: 87/99

It goes without saying that the site performs much better on mobile, which was also an important factor.

Since there's no node.js on the server, I couldn't use Angular's server-side-rendering to fully support SEO. However, using simple PHP workaround to add the important meta/opengraph elements worked a treat (see my blog for the details).

The new design is very minimal but contains almost all the features of the previous one (filtering by year or post type). The current look may change in the future even though I like the cleanliness of it.

It was a great journey with some trial and error experience from a dev POV. However, the outcome confirmed it was worth the effort, plus I also learned a lot of new things.