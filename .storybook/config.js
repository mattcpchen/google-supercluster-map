import { configure } from '@storybook/react';

const req_components = require.context('../src/components', true, /\.story\.js$/)
const req_examples = require.context('../src/examples', true, /\.story\.js$/)

function loadStories () {
  req_components.keys().forEach(filename => req_components(filename))
  req_examples.keys().forEach(filename => req_examples(filename))
}

configure(loadStories, module);
