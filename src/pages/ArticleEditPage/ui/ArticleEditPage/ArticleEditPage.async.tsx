import { lazy } from "react";

export const ArticleEditPageAsync = lazy(
  () =>
    new Promise((resolve) => {
      // @ts-ignore
      // на время; так делать не стоит
      setTimeout(() => resolve(import("./ArticleEditPage")), 400);
    })
);
