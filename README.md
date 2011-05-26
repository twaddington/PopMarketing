PopMarketing
============
Version 1.0 by [Tristan Waddington](http://www.tristanwaddington.com/)

This is a quick and dirty script I hacked together to show marketing overlays
on the [Dark Horse website](http://www.darkhorse.com/). It can be used to
display a graphic overlay on a website after a short timeout. The dismissable
overlay 'pops' from the bottom of the visitor's web browser.

Requires
--------
* [jQuery 1.4](http://jquery.com/) or newer (older versions might work, but are not tested)
* [jQuery Easing 1.3 or newer](http://gsgd.co.uk/sandbox/jquery/easing/)

Basic usage
-----------
Use the PopMarketing overlay by calling it on the body element like so:

            $(document).ready(function() {
                $('body').popmarketing({
                    'width': 600,                      // Width of image asset
                    'height': 500,                     // Height of image asset
                    'delay': 1500,                     // Delay before showing overlay
                    'image': '../images/trap.png',     // The image asset to use
                    'target': 'http://www.google.com/' // Where to send people who click the overlay
                }); 
            });

See the demo/index.html for an example.

Extra parameters
----------------
You can pass in extra parameters to control certain aspects of PopMarketing like this:

        var settings = {
            'width': '',
            'height': '',
            'image': '',
            'target': '',
            'hiddenOffset': 60, // Set to 0 (zero) to completely hide the overlay
            'offsetLeft': 40,   // The left offset of the visible overlay
            'offsetTop': 80,    // The closest the overlay will get to the top of the browser
            'delay': 1000,
            'easeIn': 'easeOutBounce',
            'easeOut': 'jswing',
            'easeInDuration': 1200,
            'easeOutDuration': 800,
            'easeInCallback': '',
            'easeOutCallback': '',
            'cookieName': 'popmarketingShow',
            'cookieExpires': '',
            'useCookie': true
        };

Mobile browsers
---------------
I haven't tested the overlay on mobile devices and, honestly, I would not recommend
using it on small screens. It's really designed for desktop users.

You can disable the overlay on mobile browsers by detecting mobile specific events:

            $(document).ready(function() {
                // Only show the overlay if the onorientationchange event is undefined
                if (typeof window.onorientationchange === 'undefined') { 
                    $('body').popmarketing({
                        'width': 600,                      // Width of image asset
                        'height': 500,                     // Height of image asset
                        'delay': 1500,                     // Delay before showing overlay
                        'image': '../images/trap.png',     // The image asset to use
                        'target': 'http://www.google.com/' // Where to send people who click the overlay
                    }); 
                }
            });
