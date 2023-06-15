import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { ArticleDetails } from "entities/Article";
import { useParams } from "react-router-dom";
import {
  ReducersMap,
  useDynamicModuleLoader,
} from "shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader";
import { Page } from "widgets/Page/Page";
import { VStack } from "shared/ui/Stack";
import { ArticleRecommendationsList } from "features/ArticleRecommendationsList";
import { ArticleDetailsComments } from "../ArticleDetailsComments/ArticleDetailsComments";
import { ArticleDetailsPageHeader } from "../ArticleDetailsPageHeader/ArticleDetailsPageHeader";
import { articleDetailsPageReducer } from "../../model/slices";
import cls from "./ArticleDetailsPage.module.scss";

interface ArticleDetailsPageProps {
  className?: string;
}
const initialReducers: ReducersMap = {
  articleDetailsPage: articleDetailsPageReducer,
};

const dynamicModuleLoaderProps = {
  reducers: initialReducers,
  removeAfterUnmount: true,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
  const { className } = props;
  useDynamicModuleLoader(dynamicModuleLoaderProps);

  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation("article-details");

  if (!id) {
    return (
      <div className={classNames(cls.articleDetailsPage, {}, [className])}>
        {t("The article was not found")}
      </div>
    );
  }

  return (
    <Page className={classNames(cls.articleDetailsPage, {}, [className])}>
      <VStack gap="16" max>
        <ArticleDetailsPageHeader />
        <ArticleDetails className={cls.articleDetails} id={id} />
        <ArticleRecommendationsList />
        <ArticleDetailsComments id={id} />
      </VStack>
    </Page>
  );
};

export default memo(ArticleDetailsPage);
