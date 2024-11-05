import { mount } from 'enzyme';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
	DecoupledEditor,
	AccessibilityHelp,
	AutoLink,
	Autosave,
	Bold,
	Essentials,
	Italic,
	Link,
	Paragraph,
	SelectAll,
	Undo
} from 'ckeditor5';

const editorConfig = {
  toolbar: {
    items: ['undo', 'redo', '|', 'bold', 'italic', '|', 'link'],
    shouldNotGroupWhenFull: false
  },
  plugins: [AccessibilityHelp, AutoLink, Autosave, Bold, Essentials, Italic, Link, Paragraph, SelectAll, Undo],
  initialData:
    '<h2>Congratulations on setting up CKEditor 5! 🎉</h2>\n<p>\n    You\'ve successfully created a CKEditor 5 project. This powerful text editor will enhance your application, enabling rich text editing\n    capabilities that are customizable and easy to use.\n</p>\n<h3>What\'s next?</h3>\n<ol>\n    <li>\n        <strong>Integrate into your app</strong>: time to bring the editing into your application. Take the code you created and add to your\n        application.\n    </li>\n    <li>\n        <strong>Explore features:</strong> Experiment with different plugins and toolbar options to discover what works best for your needs.\n    </li>\n    <li>\n        <strong>Customize your editor:</strong> Tailor the editor\'s configuration to match your application\'s style and requirements. Or even\n        write your plugin!\n    </li>\n</ol>\n<p>\n    Keep experimenting, and don\'t hesitate to push the boundaries of what you can achieve with CKEditor 5. Your feedback is invaluable to us\n    as we strive to improve and evolve. Happy editing!\n</p>\n<h3>Helpful resources</h3>\n<ul>\n    <li>📝 <a href="https://orders.ckeditor.com/trial/premium-features">Trial sign up</a>,</li>\n    <li>📕 <a href="https://ckeditor.com/docs/ckeditor5/latest/installation/index.html">Documentation</a>,</li>\n    <li>⭐️ <a href="https://github.com/ckeditor/ckeditor5">GitHub</a> (star us if you can!),</li>\n    <li>🏠 <a href="https://ckeditor.com">CKEditor Homepage</a>,</li>\n    <li>🧑‍💻 <a href="https://ckeditor.com/ckeditor-5/demo/">CKEditor 5 Demos</a>,</li>\n</ul>\n<h3>Need help?</h3>\n<p>\n    See this text, but the editor is not starting up? Check the browser\'s console for clues and guidance. It may be related to an incorrect\n    license key if you use premium features or another feature-related requirement. If you cannot make it work, file a GitHub issue, and we\n    will help as soon as possible!\n</p>\n',
  link: {
    addTargetToExternalLinks: true,
    defaultProtocol: 'https://',
    decorators: {
      toggleDownloadable: {
        mode: 'manual',
        label: 'Downloadable',
        attributes: {
          download: 'file'
        }
      }
    }
  },
  placeholder: 'Type or paste your content here!'
};

describe('CKEditor5', () => {
  describe('HTML content', () => {
    it('renders correctly the HTML content', async () => {
      let CK5Comp = null;
      const onChange = jest.fn();
      const isReady = new Promise((resolve) => {
        const onReady = (_editor: any) => {
          resolve(true);
        };
        const test = mount(<CKEditor editor={DecoupledEditor} config={editorConfig as any}></CKEditor>);
      });

      await isReady;
      const CKEditorInstance = CK5Comp!.instance();
      CKEditorInstance['onChange']?.();
      const [[changed]] = onChange.mock.calls;
      expect(test).toMatchSnapshot();
    });
  });
});
