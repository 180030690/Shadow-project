/* eslint-disable no-undef */

'use strict';

import headerHtml from './header.mock';

const compRegisterRef = require('lib/component-register');
const header = require('./header');

const { registerComponent } = compRegisterRef;

const newNode = document.createElement('div');
newNode.innerHTML = headerHtml;

describe('header', () => {
  let instance;
  beforeAll(() => {
    instance = header.createHeaderInstance();
    instance.attached();
    instance.detached();
  });
  test('header style definition', () => {
    expect(newNode.firstElementChild.classList.contains(header.styleDefinition)).toBe(true);
  });
  test('header component Reference', () => {
    expect(newNode.firstElementChild.classList.contains(header.componentReference)).toBe(true);
  });
});
