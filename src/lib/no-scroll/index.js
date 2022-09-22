import domUtil from 'lib/dom/dom-util';

export function addNoScroll(domTarget = 'body') {
    const bodyRef = domUtil.findFirst(domTarget, null);
    domUtil.addClass(bodyRef, 'no-scroll');
}

export function removeNoScroll(domTarget = 'body') {
    const bodyRef = domUtil.findFirst(domTarget, null);
    domUtil.removeClass(bodyRef, 'no-scroll');
}

// Using JS no-scroll as if we we add no-scroll, it is causing page width change
function noscroll() {
    window.scrollTo(0, 0);
}

// https: davidwells.io/snippets/disable-scrolling-with-javascript/
export function addJSNoScroll() {
    window.addEventListener('scroll', noscroll);
}

export function removeJSNoScroll() {
    window.removeEventListener('scroll', noscroll);
}
