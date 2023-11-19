import { memo } from "react";

import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { ArticleDetails } from "@/entities/Article";
import { ArticleRating } from "@/features/ArticleRating";
import { ArticleRecommendationsList } from "@/features/ArticleRecommendationsList";
import { classNames } from "@/shared/lib/classNames/classNames";
import {
  ReducersMap,
  useDynamicModuleLoader,
} from "@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader";
import { VStack } from "@/shared/ui/Stack";
import { Page } from "@/widgets/Page";

import cls from "./ArticleDetailsPage.module.scss";

import { articleDetailsPageReducer } from "../../model/slices";
import { ArticleDetailsComments } from "../ArticleDetailsComments/ArticleDetailsComments";
import { ArticleDetailsPageHeader } from "../ArticleDetailsPageHeader/ArticleDetailsPageHeader";

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

  // if (!id) {
  //   return null;
  // }

  return (
    <Page className={classNames(cls.articleDetailsPage, {}, [className])}>
      <VStack gap="16" max>
        <ArticleDetailsPageHeader />
        <ArticleDetails className={cls.articleDetails} id={id!} />
        <ArticleRating articleId={id} />
        <ArticleRecommendationsList />
        <ArticleDetailsComments id={id!} />
      </VStack>
    </Page>
  );
};

export default memo(ArticleDetailsPage);
