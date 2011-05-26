 /**
 * Copyright (c) 2011 Tristan Waddington <tristan.waddington@gmail.com>
 *
 * Permission to use, copy, modify, and distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 **/
(function($) {
    $.fn.popmarketing = function(options) {
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

        if (options) {
            $.extend(settings, options);
        }

        var overlay = $('<div/>', {
            'id': 'pop-marketing-overlay'
        }).css({
            'display': 'none',
            'position': 'fixed',
            'left': settings.offsetLeft,
            'width': settings.width,
            'height': settings.height,
            'background-image': 'url("' + settings.image + '")',
            'background-position': '0 0',
            'background-repeat': 'no-repeat',
            'background-color': 'transparent',
            'cursor': 'pointer',
            'z-index': 9999
        });

        // Add title text to linked-overlay
        if (settings.target) {
            overlay.attr('title', 'Go to: ' + settings.target);
        }

        function popmarketing_set_cookie() {
            var expires, cookie_value;

            if (!settings.cookieExpires) {
                expires = new Date();
                expires.setDate(expires.getDate() + 365);
            }
            else {
                expires = settings.cookieExpires;
            }

            cookie_value = "set; expires=" + expires.toUTCString();
            document.cookie = settings.cookieName + "=" + cookie_value;

            return true;
        }

        function popmarketing_cookie_is_set() {
            return document.cookie.indexOf(settings.cookieName) != -1;
        }

        function popmarketing_init() {
            overlay.css('bottom', -settings.height).appendTo('body').show();

            $('body').addClass('popmarketing-on');
        }

        function popmarketing_show() {
            var offset = overlay.height() - ($(window).height() - settings.offsetTop);

            overlay.addClass('visible').animate({
                'bottom': Math.min(-offset, 0) // Anchor overlay to bottom of browser
            }, settings.easeInDuration, settings.easeIn, function() {
                $('body').removeClass('popmarketing-hidden').addClass('popmarketing-visible');

                // Call user defined callback
                if (typeof settings.easeInCallback === 'function') {
                    settings.easeInCallback(overlay);
                }
            });
        }

        function popmarketing_hide() {
            var offset = -(overlay.height() - settings.hiddenOffset);

            overlay.removeClass('visible').animate({
                'bottom': offset
            }, settings.easeOutDuration, settings.easeOut, function() {
                $('body').removeClass('popmarketing-visible').addClass('popmarketing-hidden');

                // Call user defined callback
                if (typeof settings.easeOutCallback === 'function') {
                    settings.easeOutCallback(overlay);
                }
            });
        }

        function popmarketing_start() {
            if (!settings.useCookie || !popmarketing_cookie_is_set()) {
                popmarketing_init();
                setTimeout(function() {
                    popmarketing_show();
                }, settings.delay);

                overlay.click(function() {
                    if (overlay.hasClass('visible')) {
                        if (settings.target) {
                            window.location = settings.target;
                        }
                        else {
                            popmarketing_hide();
                        }
                    }
                    else {
                        popmarketing_show();
                    }
                    return false;
                });

                $(document).click(function() {
                    if (overlay.hasClass('visible')) {
                        popmarketing_hide();
                    }
                });

                if (settings.useCookie) {
                    popmarketing_set_cookie();
                }
            }
        }

        return this.each(function() {
            popmarketing_start();
        });
    };
})(jQuery)
