import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';

export const fetchArticlesList = createAsyncThunk<
  Article[],
  void,
  ThunkConfig<string>>(
    'articlesPage/fetchArticlesList',
    async (articleId, thunkAPI) => {
      const { extra, dispatch, rejectWithValue } = thunkAPI;

      try {
        const { data } = await extra.api.get<Article[]>('/articles', {
          params: {
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
