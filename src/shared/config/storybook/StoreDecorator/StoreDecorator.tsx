import { Story } from "@storybook/react";

import { StateSchema, StoreProvider } from "@/app/providers/StoreProvider";
import { articleDetailsPageReducer } from "@/pages/ArticleDetailsPage/testing";
import { addCommentFormReducer } from "@/features/AddCommentForm/testing";
import { loginReducer } from "@/features/AuthByUsername/testing";
import { profileReducer } from "@/features/EditableProfileCard/testing";
import { articleDetailsReducer } from "@/entities/Article/testing";
import { ReducersMap } from "@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader";

const defaultAsyncReducers: ReducersMap = {
  loginForm: loginReducer,
  profile: profileReducer,
  articleDetails: articleDetailsReducer,
  addCommentForm: addCommentFormReducer,
  articleDetailsPage: articleDetailsPageReducer,
};

export const StoreDecorator = (
  state: DeepPartial<StateSchema>,
  asyncReducers?: ReducersMap
) => {
  return (StoryComponent: Story) => (
    <StoreProvider
      initialState={state}
      asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
    >
      <StoryComponent />
    </StoreProvider>
  );
};
