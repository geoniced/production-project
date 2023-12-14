import { StateSchema } from '@/app/providers/StoreProvider';

import {
  getArticleDetailsCommentsError,
  getArticleDetailsCommentsIsLoading,
} from './comments';

describe('comments selectors test', () => {
  test('should work with filled state isLoading', () => {
    const data = {
      isLoading: true,
    };

    const state: DeepPartial<StateSchema> = {
      articleDetailsPage: {
        comments: {
          ...data,
        },
      },
    };
    expect(getArticleDetailsCommentsIsLoading(state as StateSchema)).toEqual(
      data.isLoading,
    );
  });

  test('should work with empty isLoading state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getArticleDetailsCommentsIsLoading(state as StateSchema)).toEqual(
      undefined,
    );
  });

  test('should return error', () => {
    const state: DeepPartial<StateSchema> = {
      articleDetailsPage: {
        comments: { error: 'error' },
      },
    };
    expect(getArticleDetailsCommentsError(state as StateSchema)).toEqual(
      'error',
    );
  });

  test('should work with empty state error', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getArticleDetailsCommentsError(state as StateSchema)).toEqual(
      undefined,
    );
  });
});
