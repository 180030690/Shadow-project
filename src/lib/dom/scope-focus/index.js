/**
 * When the user tabs to the next selectable element, it will remain within the
 * DOM scope. When first initialized, the first selectable element will be
 * focused.
 *
 * @module dom
 * @version 1.0.0
 * @since Thu Sep 1 2016
 */
'use strict';

//dependencies
var filter = require('lodash.filter');
var keyCode = require('dom/keyboard/key-code');
var isChildOf = require('dom/is-child-of');
var isVisible = require('dom/is-visible');

/**
 * The limited DOM scope.
 * @type {HTMLElement}
 */
var currentTarget = null;

/**
 * All selectable child elements within `currentTarget`.
 * @type {NodeList}
 */
var selectableEls = null;

/**
 * The current focued element within `selectableEls`.
 * @type {HTMLElement}
 */
var currentFocused = null;

/**
 * Start the DOM listeners.
 */
function addListeners() {
    document.addEventListener('keyup', onKeyUp);
}

/**
 * If the key is the tab, update the focused target.
 *
 * @param  {object} event
 */
function onKeyUp(event) {
    if (keyCode.isTab(event)) {
        validateFocuedTarget();
    }
}

/**
 * If the current active element is within our scope, update `currentFocused`.
 * Otherwise find a new target within the scope to focus.
 */
function validateFocuedTarget() {
    if (isChildOf(currentTarget, document.activeElement)) {
        updateCurrentFocus();
        return;
    }
    focusNewTarget();
}

/**
 * Focus either the first or last element in the scope depending on which was
 * last focused.
 */
function focusNewTarget() {
    //Grab visible everytime since the view can change, for ex the sign in modal
    //has "Sign In" and "Create Account" toggler.
    var elList = getVisibleElements();
    if (elList.length < 1) {
        return;
    }
    var first = elList[0];
    var last = elList[elList.length - 1];
    if (currentFocused === first) {
        updateCurrentFocus(last);
    }
    else if (currentFocused === last) {
        updateCurrentFocus(first);
    }
    currentFocused.focus();
}

/**
 * Update `currentFocused` element.
 *
 * @param  {HTMLElement | undefined} opt_el
 */
function updateCurrentFocus(opt_el) {
    currentFocused = opt_el || document.activeElement;
}

/**
 * Return a list of focusable elements, which are visible within the scope.
 *
 * @return {Array}
 */
function getVisibleElements() {
    return filter(selectableEls, isVisible);
}

/**
 * Find all focusable elements within the scope and focus the first one.
 */
function findAnfocusFirstTarget() {
    selectableEls = currentTarget.querySelectorAll('video, select, textarea, area, a, input:not([type=hidden]), button');
    if (selectableEls.length < 1) {
        return;
    }
    updateCurrentFocus(selectableEls[0]);
    setTimeout(focusFirstTarget, 100);
}

/**
 * Focus the current element.
 */
function focusFirstTarget() {
    if(currentFocused) {
        currentFocused.focus();
    }
}

/**
 * Set the new limited scope we want to stay within.
 *
 * @param {HTMLElement} el The new DOM scope.
 */
exports.setScopeLimit = function(el) {
    currentTarget = el;
    addListeners();
    findAnfocusFirstTarget();
};

/**
 * Dispose all elements and listeners.
 */
exports.dispose = function() {
    currentTarget = null;
    selectableEls = null;
    currentFocused = null;
    document.removeEventListener('keyup', onKeyUp);
};
