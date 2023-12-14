import { Comment } from '@/entities/Comment';
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

import { fetchCommentsByArticleId } from './fetchCommentsByArticleId';

const data: Comment[] = [
  {
    id: '1',
    user: {
      id: '1',
      username: 'ivan',
      avatar: 'https://placeholder.com/avatar.jpg',
    },
    text: 'Comment text',
  },
  {
    id: '2',
    user: {
      id: '2',
      username: 'admin',
      avatar: 'https://placeholder.com/avatar.jpg',
    },
    text: 'Comment text 2',
  },
];

describe('fetchCommentsByArticleId.test', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(fetchCommentsByArticleId);
    thunk.api.get.mockReturnValue(Promise.resolve({ data }));

    const result = await thunk.callThunk('1');

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toEqual('fulfilled');
    expect(result.payload).toEqual(data);
  });

  test('server error', async () => {
    const thunk = new TestAsyncThunk(fetchCommentsByArticleId);
    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk('1');

    expect(result.meta.requestStatus).toEqual('rejected');
    expect(result.payload).toEqual('error');
  });

  test('no article id error', async () => {
    const thunk = new TestAsyncThunk(fetchCommentsByArticleId);
    thunk.api.get.mockReturnValue(Promise.resolve({ data }));
    const result = await thunk.callThunk('');

    expect(result.meta.requestStatus).toEqual('rejected');
    expect(result.payload).toEqual('error');
  });
});
