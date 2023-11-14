import { Story } from "@storybook/react";
import { StateSchema, StoreProvider } from "@/app/providers/StoreProvider";
// TODO
// eslint-disable-next-line kashin-fsd-plugin/public-api-imports
import { loginReducer } from "@/features/AuthByUsername/model/slice/loginSlice";
import { ReducersMap } from "@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader";
// eslint-disable-next-line kashin-fsd-plugin/public-api-imports
import { articleDetailsReducer } from "@/entities/Article/model/slice/articleDetailsSlice";
// eslint-disable-next-line kashin-fsd-plugin/public-api-imports
import { addCommentFormReducer } from "@/features/AddCommentForm/model/slices/addCommentFormSlice";
// eslint-disable-next-line kashin-fsd-plugin/public-api-imports
import { articleDetailsPageReducer } from "@/pages/ArticleDetailsPage/model/slices";
// eslint-disable-next-line kashin-fsd-plugin/public-api-imports
import { profileReducer } from "@/features/EditableProfileCard/model/slice/profileSlice";

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
