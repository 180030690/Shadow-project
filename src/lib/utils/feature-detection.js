'use strict';

const objectFitImages = require('object-fit-images');

// import focusWithin from 'focus-within';

import styleVariables from 'stylesheets/_variables.scss';

const $ = require('jquery');
const LazyLoad = require('vanilla-lazyload');
const picturefill = require('picturefill');
const matchMedia = require('lib/dom/match-media');
const getDataAttributes = require('lib/dom/get-data-attributes');
const parser = require('ua-parser-js');

/**
 * scroll to top of page.
 * @returns {void}
 */
function initScrollToTop() {
    const backToTopElem = $('.back-to-top');

    // add window scroll listener
    $(window).on('scroll', function () {
        const scrollTop = $(window).scrollTop();
        const $body = $('body');
        if (window.pageYOffset >= $('.global-banner').height()) {
            $body.addClass('fixed-header');
            backToTopElem.removeClass('hide');
        } else {
            $body.removeClass('fixed-header');
            backToTopElem.addClass('hide');
        }

        if ($(document).find($('.with-splash-image').length > 0)) {
            $(".sticky-nav").css("z-index", "21");
            if ($(window).scrollTop() < $('.header').height()) {
                $(".sticky-nav").css("z-index", "20");
            }
        }

    });

    // add click listener for scrolling back to top
    backToTopElem.on('click', function () {
        $('html, body').animate(
            { scrollTop: 0 },
            'slow',
            () => {
                $('.skipToMain') && $('.skipToMain').focus();
            }
        );
    });
}

/**
 * sets text position for hero banners.
 * @returns {void}
 */
function setTextPosition() {
    $('.adjust-position, .foreground-image').each(function () {
        const isDesktop = window.matchMedia(matchMedia.BREAKPOINTS.DESKTOP_AND_ABOVE).matches;
        const $this = $(this);
        const imagePositions = getDataAttributes($this[0]);

        if (isDesktop) {
            $this.css({
                'top': imagePositions.posTop,
                'left': imagePositions.posLeft
            });
        } else {
            $this.css({
                'top': imagePositions.mobilePosTop,
                'left': imagePositions.mobilePosLeft
            });
        }
        $this.addClass('show');
    });
}

/**
 * Initialize the sticky nav
 */
function initializeStickyNav() {
    const $stickyNav = $('.sticky-nav');
    const $body = $('body');
    if (!$stickyNav.length) {
        $body.removeClass('with-sticky-nav');
        return;
    }
    $stickyNav.find('.sticky-nav__container').StickyNav();
    $body.addClass('with-sticky-nav');
}

/**
 * Initialize Browser Detection
 */
function initBrowserDetection() {
    const agent = new parser().getResult();

    switch (agent.browser.name) {
        case 'IE':
            $('body').addClass('ie');
            break;
        case 'Chrome':
            $('body').addClass('chrome');
            break;
        case 'Firefox':
            $('body').addClass('firefox');
            break;
        case 'Safari':
            $('body').addClass('safari');
            break;
        default:
            break;
    }
}

function slickCarouselInit() {
    $('body').find('[data-marketing-carousel]').slick({
        slidesToShow: 1,
        dots: true,
        infinite: false,
        responsive: [
            {
                breakpoint: styleVariables.tabletBreakPoint,
                settings: {
                    slidesToShow: 1.05,
                    slidesToScroll: 1
                },
                dots: false
            },
            {
                breakpoint: styleVariables.mobileBreakPoint,
                settings: {
                    slidesToShow: 1.05,
                    slidesToScroll: 1
                }
            }
        ]
    });
}

/**
 * Initialize lazy load
 */
function initializeLazyLoad() {
    window.lazyLoad = new LazyLoad();
}

/**
 * Initialize custom events
 */
function initCustomEvents() {
    if (typeof window.CustomEvent === "function") return false;

    function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent;
}

/**
 * Triggers all the featuresDetection functions on DOM ready
 */
function featuresDetection() {
    objectFitImages(null, { watchMQ: true });
    // focusWithin(document);
    initBrowserDetection();
    initializeLazyLoad();
    initScrollToTop();
    setTextPosition();
    initializeStickyNav();
    slickCarouselInit();
    initCustomEvents();
}

/**
 * Triggers all the functions that are required on resize
 */
function triggerMethodsOnResize() {
    initializeLazyLoad();
    setTextPosition();
}

/**
 * Triggers fallback functions on DOM ready event
 * @param  {Object} function callback
 */
jQuery(document).ready(featuresDetection);

/**
 * Triggers functions on window resize
 * @param  {Object} function callback
 */
jQuery(window).on('resize', triggerMethodsOnResize);
