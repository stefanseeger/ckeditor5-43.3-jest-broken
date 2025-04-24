import { mount, ReactWrapper } from 'enzyme';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
	DecoupledEditor,
	Bold,
  EditorConfig
} from 'ckeditor5';
import { UsersInit } from './users-init-plugin';
import { CommentsIntegration } from './comments-adapter-plugin';
import { Comments, Users } from 'ckeditor5-premium-features';

const editorConfig: EditorConfig  = {
  licenseKey: "GPL",
  toolbar: {
    items: ['bold'],
    shouldNotGroupWhenFull: false
  },
  plugins: [Bold, Users, UsersInit, Comments, CommentsIntegration],
  initialData:
    'Data data',
  comments: {
    editorConfig: {},
  },
  placeholder: 'Type or paste your content here!'
};

describe('CKEditor5', () => {
  describe('HTML content', () => {
    it('renders correctly the HTML content', async () => {
      let CK5Comp: ReactWrapper;
      const onChange = jest.fn();
      const isReady = new Promise((resolve, reject) => {
        const onReady = (_editor: DecoupledEditor) => {
          const _readOnlyLocks = Array.from(_editor["_readOnlyLocks"])
          if(_readOnlyLocks.length) {
            reject(new Error(`CKEditor should not be locked\n ${JSON.stringify(_readOnlyLocks)}`))
          }
          resolve(true);
        };
        const onError = (
          error: Error,
          errorDetails: {
              phase: "initialization" | "runtime";
              willEditorRestart?: boolean;
          },
      ) => {
          console.error("CKEditor5 error", error, errorDetails);
          reject(error)
        }
        CK5Comp = mount(<CKEditor editor={DecoupledEditor} config={editorConfig as any} onReady={onReady} onError={onError} onChange={onChange} />);
      });

      await isReady;
      expect(CK5Comp).toMatchSnapshot();
    });
  });
});
