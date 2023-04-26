import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Article } from "../../types/article";

export const fetchArticleById = createAsyncThunk<Article, string, ThunkConfig<string>>(
  "articleDetails/fetchArticleById",
  async (articleId, thunkAPI) => {
    const { extra, dispatch, rejectWithValue } = thunkAPI;

    try {
      const { data } = await extra.api.get<Article>(`/articles/${articleId}`, {
        params: {
          _expand: "user",
        },
      });

      if (!data) {
        throw new Error();
      }

      return data;
    } catch (err) {
      return rejectWithValue("error");
    }
  }
);
