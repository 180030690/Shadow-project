/**
 * ScrollTo an element 
 * @param element reference or selector
 */
const $ = require('jquery');

const scrollSpeed = 500;

export const scrollTo = (ref) => {
    const $ref = $(ref);
    $('html, body').stop().animate({
        scrollTop: Math.floor($ref.offset().top)
    }, scrollSpeed, () => {
        $ref && $ref.focus();
    });
}