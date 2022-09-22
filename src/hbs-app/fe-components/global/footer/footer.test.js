/* eslint-disable no-undef */

'use strict';

import footerHtml from './footer.mock';

const compRegisterRef = require('lib/component-register');
const footer = require('./footer');

const { registerComponent } = compRegisterRef;

const newNode = document.createElement('div');
newNode.innerHTML = footerHtml;

describe('footer', () => {
  let instance;
  beforeAll(() => {
    instance = footer.createFooterInstance();
    instance.attached();
    instance.detached();
  });
  test('footer style definition', () => {
    expect(newNode.firstElementChild.classList.contains(footer.styleDefinition)).toBe(true);
  });
  test('footer component Reference', () => {
    expect(newNode.firstElementChild.classList.contains(footer.componentReference)).toBe(true);
  });
});
