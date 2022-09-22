/* eslint-disable no-undef */

'use strict';

import contentTileHtml from './content-tile.mock';

const compRegisterRef = require('lib/component-register');
const contentTile = require('./content-tile');

const { registerComponent } = compRegisterRef;

const newNode = document.createElement('div');
newNode.innerHTML = contentTileHtml;

describe('content-tile', () => {
  let instance;
  beforeAll(() => {
    instance = contentTile.createContenttileInstance();
    instance.attached();
    instance.detached();
  });
  test('content-tile style definition', () => {
    expect(newNode.firstElementChild.classList.contains(contentTile.styleDefinition)).toBe(true);
  });
  test('content-tile component Reference', () => {
    expect(newNode.firstElementChild.classList.contains(contentTile.componentReference)).toBe(true);
  });
});
