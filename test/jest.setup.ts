/**
 * Execution Timing: Runs before Jest is loaded, before the testing environment is set up
 *Use Cases:
 *Setting global variables
 *Loading polyfills
 *Mocking browser APIs
 *Setting environment variables
 *Context: Code runs in a Node environment, not in the test environment
 *Access: Cannot access Jest's global functions (like jest.fn()) in these files
 */
 import { randomUUID } from "node:crypto";

 import enzyme from "enzyme";
 import Adapter from "enzyme-adapter-react-16";
 import { TextEncoder } from "util";
 
 global.navigator = {
     userAgent: "node.js",
     appName: "Netscape",
     appVersion:
         "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
 } as any;
 global.window["HTMLCanvasElement"] = function HTMLCanvasElement() {} as any;
 (window as any).USE_STATIC_TEST_ID = true;
 // Single test should fail when the test throw console.error
 const { error } = console;
 // eslint-disable-next-line no-console
 console.error = function (message, ...args) {
     if (typeof message?.message === "string") {
         // Destructure Error messages
         ({ message } = message);
     }
     if (
         typeof message === "string" &&
         (message.includes("Invalid aria prop") ||
             message.includes("deprecated") ||
             message.includes("If you intentionally want it to appear in the DOM as a custom attribute") ||
             message.includes("Object.dispatchError") ||
             message.includes("Warning: `value` should be array when `mode` is `multiple` or `tags`"))
     ) {
         return;
     }
     error.apply(console, [message, ...args]); // keep default behaviour for other errors
 };
 
 global.matchMedia =
     global.matchMedia ||
     function () {
         return {
             addListener: jest.fn(),
             removeListener: jest.fn(),
         };
     };
 
 enzyme.configure({ adapter: new Adapter() });
 global.ResizeObserver = require("resize-observer-polyfill");
 
 // Fixes https://github.com/jsdom/jsdom/issues/3363
 window.structuredClone = (val: any) => JSON.parse(JSON.stringify(val));
 
 const getClientRects = () => ({
     item: () => null,
     length: 0,
     [Symbol.iterator]: function* () {} as any,
 });
 global.Element.prototype.getClientRects = getClientRects;
 global.Range.prototype.getClientRects = getClientRects;
 window.scrollTo = jest.fn();
 // Fix randomUUID for jest
 global.crypto.randomUUID = randomUUID;
 global.TextEncoder = TextEncoder;
 