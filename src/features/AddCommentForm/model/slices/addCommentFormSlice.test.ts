import { addCommentFormActions, addCommentFormReducer } from './addCommentFormSlice';
import { AddCommentFormSchema } from '../types/addCommentForm';

const data = {
  text: '',
};

describe('addCommentFormSlice.test', () => {
  test('test set text', () => {
    const state: DeepPartial<AddCommentFormSchema> = { text: '' };
    expect(addCommentFormReducer(
      state as AddCommentFormSchema,
      addCommentFormActions.setText('Comment'),
    )).toEqual({ text: 'Comment' });
  });
});
