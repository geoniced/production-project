import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Comment } from 'entities/Comment';

export const fetchCommentsByArticleId = createAsyncThunk<
  Comment[],
  string | undefined,
  ThunkConfig<string>>(
    'articleDetails/fetchCommentsByArticleId',
    async (articleId, thunkAPI) => {
      const { extra, dispatch, rejectWithValue } = thunkAPI;

      if (!articleId) {
        return rejectWithValue('error');
      }

      try {
        const { data } = await extra.api.get<Comment[]>('/comments', {
          params: {
            articleId,
            _expand: 'user',
          },
        });

        if (!data) {
          throw new Error();
        }

        return data;
      } catch (err) {
        return rejectWithValue('error');
      }
    },
  );
