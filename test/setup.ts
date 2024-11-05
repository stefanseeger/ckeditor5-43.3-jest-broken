const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const path = require('path');

enzyme.configure({ adapter: new Adapter() });

const { error } = console;
console.error = function (message) {
  // "Invalid aria prop aria-description" is error due to bug in react - remove this when upgrading to react-18
  // https://github.com/facebook/react/issues/21035 fixed with react-18;
  if (
    typeof message === 'string' &&
    (message.includes('Invalid aria prop') ||
      !message.includes('deprecated') ||
      !message.includes(
        'If you intentionally want it to appear in the DOM as a custom attribute'
      ))
  ) {
    return;
  }
  error.apply(console, arguments as any); // keep default behaviour for other errors
};


// Fixes https://github.com/jsdom/jsdom/issues/3363
global.structuredClone = (val) => JSON.parse(JSON.stringify(val));
