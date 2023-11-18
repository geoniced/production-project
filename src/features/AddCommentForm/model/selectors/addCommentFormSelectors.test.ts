import { StateSchema } from '@/app/providers/StoreProvider';

import { getAddCommentFormText, getAddCommentFormError } from './addCommentFormSelectors';

describe('addCommentFormSelectors.test', () => {
  test('should work with filled state', () => {
    const data = {
      text: 'Comment text',
    };

    const state: DeepPartial<StateSchema> = {
      addCommentForm: {
        ...data,
      },
    };
    expect(getAddCommentFormText(state as StateSchema)).toEqual(data.text);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getAddCommentFormText(state as StateSchema)).toEqual('');
  });

  test('should return error', () => {
    const state: DeepPartial<StateSchema> = {
      addCommentForm: {
        error: 'error',
      },
    };
    expect(getAddCommentFormError(state as StateSchema)).toEqual('error');
  });

  test('should work with empty state error', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getAddCommentFormError(state as StateSchema)).toEqual(undefined);
  });
});
