import { configure } from '@storybook/html';

function loadStories() {
  require('../html/index.js');
}

configure(loadStories, module);