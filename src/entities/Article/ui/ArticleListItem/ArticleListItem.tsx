import { HTMLAttributeAnchorTarget, memo } from "react";
import { useTranslation } from "react-i18next";

import EyeIcon from "@/shared/assets/icons/eye-20-20.svg";
import { getRouteArticleDetails } from "@/shared/const/router";
import { classNames } from "@/shared/lib/classNames/classNames";
import { AppImage } from "@/shared/ui/AppImage";
import { AppLink } from "@/shared/ui/AppLink";
import { Avatar } from "@/shared/ui/Avatar";
import { Button, ButtonTheme } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { Icon } from "@/shared/ui/Icon";
import { Skeleton } from "@/shared/ui/Skeleton";
import { Text } from "@/shared/ui/Text";

import {
  ArticleBlockType,
  ArticleView,
} from "../../model/consts/articleConsts";
import { Article, ArticleTextBlock } from "../../model/types/article";
import { ArticleTextBlockComponent } from "../ArticleTextBlockComponent/ArticleTextBlockComponent";
import cls from "./ArticleListItem.module.scss";

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo(function ArticleListItem(
  props: ArticleListItemProps
) {
  const { className, article, view, target } = props;

  const { t } = useTranslation();

  const types = (
    <Text
      className={cls.types}
      text={article.type.join(", ")}
      data-testid="ArticleListItem.Types"
    />
  );
  const views = (
    <>
      <Text className={cls.views} text={String(article.views)} />
      <Icon className={cls.viewsIcon} Svg={EyeIcon} />
    </>
  );

  const articleLink = getRouteArticleDetails(article.id);

  if (view === ArticleView.LIST) {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT
    ) as ArticleTextBlock;
    return (
      <div
        className={classNames(cls.articleListItem, {}, [className, cls[view]])}
        data-testid="ArticleListItem"
      >
        <Card className={cls.list}>
          <div className={cls.header}>
            <Avatar size={30} src={article.user.avatar} />
            <Text className={cls.username} text={article.user.username} />
            <Text className={cls.date} text={article.createdAt} />
          </div>

          <Text
            className={cls.title}
            title={article.title}
            tag="h2"
            data-testid="ArticleListItemTitle"
          />

          {types}

          <AppImage
            className={cls.img}
            src={article.img}
            alt={article.title}
            width="400"
            height="200"
            fallback={<Skeleton width="100%" height={200} />}
          />

          {textBlock && (
            <ArticleTextBlockComponent
              className={cls.textBlock}
              block={textBlock}
            />
          )}

          <div className={cls.footer}>
            <AppLink target={target} to={articleLink}>
              <Button theme={ButtonTheme.OUTLINE}>{t("Read more")}</Button>
            </AppLink>
            {views}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <AppLink
      data-testid="ArticleListItem"
      target={target}
      to={articleLink}
      className={classNames(cls.articleListItem, {}, [className, cls[view]])}
    >
      <Card className={cls.tile}>
        <div className={cls.imageWrapper}>
          <AppImage
            className={cls.img}
            src={article.img}
            alt={article.title}
            width={200}
            height={200}
            fallback={<Skeleton width={200} height={200} />}
          />
          <Text className={cls.date} text={article.createdAt} />
        </div>

        <div className={cls.infoWrapper}>
          {types}
          {views}
        </div>

        <Text
          className={cls.title}
          text={article.title}
          data-testid="ArticleListItemTitle"
        />
      </Card>
    </AppLink>
  );
});
