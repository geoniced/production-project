import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Comment } from "@/entities/Comment";
import { getUserAuthData } from "@/entities/User";
import { getArticleDetailsData } from "@/entities/Article";
import { fetchCommentsByArticleId } from "../fetchCommentsByArticleId/fetchCommentsByArticleId";

export const addCommentForArticle = createAsyncThunk<
  Comment,
  string,
  ThunkConfig<string>
>("articleDetails/addCommentForArticle", async (text, thunkAPI) => {
  const { extra, dispatch, rejectWithValue, getState } = thunkAPI;

  const userData = getUserAuthData(getState());
  const article = getArticleDetailsData(getState());

  if (!userData || !text || !article) {
    return rejectWithValue("no data provided");
  }

  try {
    const { data } = await extra.api.post<Comment>("/comments", {
      articleId: article?.id,
      userId: userData.id,
      text,
    });

    if (!data) {
      throw new Error();
    }

    dispatch(fetchCommentsByArticleId(article.id));

    return data;
  } catch (err) {
    return rejectWithValue("error");
  }
});
