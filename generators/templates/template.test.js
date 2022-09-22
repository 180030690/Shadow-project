/* eslint-disable no-undef */

'use strict';

const compRegisterRef = require('lib/component-register');
const component = require('./{component-name}');

const { registerComponent } = compRegisterRef;

describe('{component-name}', () => {
  let instance;
  beforeAll(() => {
    instance = footer.create{separate-component-name}Instance();
    instance.attached();
    instance.detached();
  });
});
