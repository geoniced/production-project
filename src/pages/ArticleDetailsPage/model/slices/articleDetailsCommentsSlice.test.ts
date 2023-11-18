import { Comment } from "@/entities/Comment";

import { articleDetailsCommentsReducer } from "./articleDetailsCommentsSlice";
import { fetchCommentsByArticleId } from "../services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import { ArticleDetailsCommentsSchema } from "../types/ArticleDetailsCommentsSchema";


const data: ArticleDetailsCommentsSchema = {
  isLoading: false,
  ids: [],
  error: undefined,
  entities: {},
};

describe("articleDetailsCommentsSlice.test", () => {
  test("test fetchCommentsByArticleId pending", () => {
    const state: DeepPartial<ArticleDetailsCommentsSchema> = {
      isLoading: false,
      error: undefined,
    };

    expect(
      articleDetailsCommentsReducer(state as ArticleDetailsCommentsSchema, fetchCommentsByArticleId.pending)
    ).toEqual({
      isLoading: true,
      error: undefined,
    });
  });

  test("test fetchCommentsByArticleId fulfilled", () => {
    const state: DeepPartial<ArticleDetailsCommentsSchema> = {
      isLoading: true,
    };

    const comments: Comment[] = [
      { id: "1", user: { username: "admin", avatar: "", id: "1" }, text: "Comment 1" },
      { id: "2", user: { username: "admin", avatar: "", id: "1" }, text: "Comment 2" },
    ];

    expect(
      articleDetailsCommentsReducer(
        state as ArticleDetailsCommentsSchema,
        fetchCommentsByArticleId.fulfilled(comments, "1", "")
      )
    ).toEqual({
      isLoading: false,
      ids: ["1", "2"],
      entities: {
        1: comments[0],
        2: comments[1],
      },
      error: undefined,
    });
  });
});
