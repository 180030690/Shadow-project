/* eslint-disable no-use-before-define */
/* eslint-disable space-before-blocks */
/* eslint-disable require-jsdoc */
/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/**
 * @module header
 * @version 1.0.0
 * @since
 */

const domUtil = require('lib/dom/dom-util');

const compRegisterRef = require('lib/component-register');

const { registerComponent } = compRegisterRef;

/**
 * The definition of the component. Each DOM element will
 * define the elements class with this string.
 * @type {string}
 */
export const componentReference = 'app-js__header';

/**
 * The style definition of the component.
 * @type {string}
 */
export const styleDefinition = 'header';

/**
 * Factory method to create an instance. Linked to an html element.
 *
 * @returns {object} Component instance.
 */
export function createHeaderInstance() {
  /**
   * Component instance.
   * @type {Object}
   */
  const instance = {};

  /**
   * By setting `instance.domRefs` the baseComponent will replace the value
   * of each keys in `instance.domRefs.first` with single elements found
   * in `instance.element`. Same for `instance.domRefs.all`, but each key
   * will have an array of elements.
   *
   * `first` example: The value of `childEl` will be a `HTMLElement`
   * `all` example: The value of `rows` will be an `Array` of `HTMLElement`
   * @type {Object}
   */
  // instance.domRefs = {
  //     definition: styleDefinition,
  //     first: {
  //
  //     }
  // };

  /** @type {Object} */
  // const singleRefs = instance.domRefs.first;

  /** @type {Object} */
  // const listRefs = instance.domRefs.all;

  /**
   * `created` is called before `attached`. Can be used to pass data to
   * childrens `params` property.
   */
  // instance.created = () => {
  //   forEach(instance.children, updateChildParams);
  // };

  /**
   * Update the `instance.params` for `childInstance`.
   *
   * @param {object} childInstance
   */
  // function updateChildParams(childInstance) {
  //   childInstance.receiveNewParams({
  //     id: instance.attribute.id,
  //     updateId: onIdChanged
  //   });
  // }

  /**
   * The `instance.params` object was changed from parent calling `instance.receiveNewParams`.
   * Properties and callback functions can be dealt with or passed down to
   * child components.
   */
  // instance.onNewParamsReceived = () => {
  //   forEach(instance.children, child => {
  //     child.receiveNewParams({
  //       updateId: instance.params.updateId
  //     });
  //   });
  // };

  /**
   * Initialize any DOM elements which can be found within the hbs file for
   * this component.
   * @returns {void}
   */
  function initDOMReferences() {
    // myEl = domUtil.findFirst('.'
    //  .concat(exports.styleDefinition)
    //  .concat('__my-el'),
    //  instance.element
    //  );
  }

  /**
   * Logic to run when component is ready
   * @returns {void}
   */
  function init() {}

  /**
   * Append listeners to the element.
   * @returns {void}
   */
  function addListeners() {
    // TODO remove inline comments, just example code.
    // To attach an event, use one of the following methods.
    // No need remove the listener in `instance.detached`
    // instance.addEventListener('click', onClick); //attached to `instance.element`
    // instance.addEventListener('click', onClick, myEl); //attached to `myEl`
    // instance.addEventListener('click', makeReservationClick, singleRefs.makeReservation);
  }

  /**
   * Dealloc variables and removes any added listeners.
   * @returns {void}
   */
  function dispose() {}

  /**
   * The DOM Element was added to the DOM.
   * @returns {void}
   */
  instance.attached = () => {
    initDOMReferences();
    init();
    addListeners();
  };

  /**
   * The DOM Element was removed from the DOM.
   * Dealloc variables and removes any added listeners that was NOT added
   * through `instance.addEventListener`.
   * @returns {void}
   */
  instance.detached = () => {
    // console.log('detached!', instance.element);
    dispose();
  };

  return instance;
}

/**
 * @description Default export
 * @returns {void}
 */
// eslint-disable-next-line
export default (function () {
  registerComponent(componentReference, createHeaderInstance);
})();

const fxn = () => {
  console.log('abc');
};

// eslint-disable-next-line space-before-function-paren
$('.b').click(function () {
  $(this).toggleClass('click');
  $('.s').toggleClass('show');
});

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  const slides = document.getElementsByClassName('mySlides');
  // eslint-disable-next-line prefer-const
  let dots = document.getElementsByClassName('demo');
  // eslint-disable-next-line prefer-const
  let captionText = document.getElementById('caption');
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(' active', '');
  }
  slides[slideIndex - 1].style.display = 'block';
  dots[slideIndex - 1].className += ' active';
  // eslint-disable-next-line space-infix-ops
  captionText.innerHTML = dots[slideIndex - 1].alt;
}

function openForm() {
  document.getElementById('myForm').style.display = 'block';
}

function closeForm() {
  document.getElementById('myForm').style.display = 'none';
}
