import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import { addCommentForArticle } from "./addCommentForArticle";

const data = {
  id: "1",
  user: { id: "1", username: "ivan" },
  text: "Comment text",
};

const authData = {
  id: "1",
  username: "ivan",
  avatar: undefined,
};

const articleDetailsData = {
  id: "1",
};

describe("addCommentForArticle.test", () => {
  test("success", async () => {
    const thunk = new TestAsyncThunk(addCommentForArticle, {
      articleDetails: {
        data: articleDetailsData,
      },
      user: {
        authData,
      },
    });
    thunk.api.post.mockReturnValue(Promise.resolve({ data }));

    const result = await thunk.callThunk("Comment text");

    // expect(thunk.dispatch).toHaveBeenCalledWith(fetchCommentsByArticleId('1'));
    expect(thunk.dispatch).toHaveBeenCalledTimes(3);
    expect(thunk.api.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toEqual("fulfilled");
    expect(result.payload).toEqual(data);
  });

  test("server error", async () => {
    const thunk = new TestAsyncThunk(addCommentForArticle, {
      articleDetails: {
        data: articleDetailsData,
      },
      user: {
        authData,
      },
    });
    thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk("Comment text");

    expect(result.meta.requestStatus).toEqual("rejected");
    expect(result.payload).toEqual("error");
  });

  test("no user data provided", async () => {
    const thunk = new TestAsyncThunk(addCommentForArticle, {
      articleDetails: {
        data: articleDetailsData,
      },
      user: {},
    });
    thunk.api.post.mockReturnValue(Promise.resolve({ data }));
    const result = await thunk.callThunk("Comment text");

    expect(result.meta.requestStatus).toEqual("rejected");
    expect(result.payload).toEqual("no data provided");
  });

  test("no article data provided", async () => {
    const thunk = new TestAsyncThunk(addCommentForArticle, {
      user: {
        authData,
      },
    });
    thunk.api.post.mockReturnValue(Promise.resolve({ data }));
    const result = await thunk.callThunk("Comment text");

    expect(result.meta.requestStatus).toEqual("rejected");
    expect(result.payload).toEqual("no data provided");
  });

  test("no comment text provided", async () => {
    const thunk = new TestAsyncThunk(addCommentForArticle, {
      articleDetails: {
        data: articleDetailsData,
      },
      user: {
        authData,
      },
    });
    thunk.api.post.mockReturnValue(Promise.resolve({ data }));
    const result = await thunk.callThunk("");

    expect(result.meta.requestStatus).toEqual("rejected");
    expect(result.payload).toEqual("no data provided");
  });
});
