const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

enzyme.configure({ adapter: new Adapter() });



// Fixes https://github.com/jsdom/jsdom/issues/3363
global.structuredClone = (val) => JSON.parse(JSON.stringify(val));
