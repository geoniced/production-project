import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Article } from "@/entities/Article";

export const fetchArticleRecommendation = createAsyncThunk<Article[], void, ThunkConfig<string>>(
  "articleDetailsPage/fetchArticleRecommendation",
  async (props, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    try {
      const { data } = await extra.api.get<Article[]>("/articles", {
        params: {
          _limit: 4,
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
