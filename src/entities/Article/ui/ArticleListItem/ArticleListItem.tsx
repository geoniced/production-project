import { classNames } from "shared/lib/classNames/classNames";
import { Text } from "shared/ui/Text/Text";
import { Icon } from "shared/ui/Icon/Icon";
import { useTranslation } from "react-i18next";
import { HTMLAttributeAnchorTarget, memo, useCallback } from "react";
import EyeIcon from "shared/assets/icons/eye-20-20.svg";
import { Card } from "shared/ui/Card/Card";
import { Avatar } from "shared/ui/Avatar/Avatar";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { AppLink } from "shared/ui/AppLink/AppLink";
import {
  ARTICLES_SCROLL_INDEX,
  USER_LOCAL_STORAGE_KEY,
} from "shared/const/localStorage";
import {
  Article,
  ArticleBlockType,
  ArticleTextBlock,
  ArticleView,
} from "../../model/types/article";
import cls from "./ArticleListItem.module.scss";
import { ArticleTextBlockComponent } from "../ArticleTextBlockComponent/ArticleTextBlockComponent";

interface ArticleListItemProps {
  index?: number;
  className?: string;
  article: Article;
  view: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
  const { className, article, view, target, index } = props;

  const { t } = useTranslation();

  const types = <Text className={cls.types} text={article.type.join(", ")} />;
  const views = (
    <>
      <Text className={cls.views} text={String(article.views)} />
      <Icon className={cls.viewsIcon} Svg={EyeIcon} />
    </>
  );

  const onItemOpenClick = useCallback(() => {
    localStorage.setItem(ARTICLES_SCROLL_INDEX, JSON.stringify(index));
  }, [index]);

  const articleLink = RoutePath.article_details + article.id;

  if (view === ArticleView.LIST) {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT
    ) as ArticleTextBlock;
    return (
      <div
        className={classNames(cls.articleListItem, {}, [className, cls[view]])}
      >
        <Card className={cls.list}>
          <div className={cls.header}>
            <Avatar size={30} src={article.user.avatar} />
            <Text className={cls.username} text={article.user.username} />
            <Text className={cls.date} text={article.createdAt} />
          </div>

          <Text className={cls.title} title={article.title} tag="h2" />

          {types}

          <img
            className={cls.img}
            src={article.img}
            alt={article.title}
            width="400"
            height="200"
          />

          {textBlock && (
            <ArticleTextBlockComponent
              className={cls.textBlock}
              block={textBlock}
            />
          )}

          <div className={cls.footer}>
            <AppLink target={target} to={articleLink}>
              <Button theme={ButtonTheme.OUTLINE} onClick={onItemOpenClick}>
                {t("Read more")}
              </Button>
            </AppLink>
            {views}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <AppLink
      onClick={onItemOpenClick}
      target={target}
      to={articleLink}
      className={classNames(cls.articleListItem, {}, [className, cls[view]])}
    >
      <Card className={cls.tile}>
        <div className={cls.imageWrapper}>
          <img
            className={cls.img}
            src={article.img}
            alt={article.title}
            width={200}
            height={200}
          />
          <Text className={cls.date} text={article.createdAt} />
        </div>

        <div className={cls.infoWrapper}>
          {types}
          {views}
        </div>

        <Text className={cls.title} text={article.title} />
      </Card>
    </AppLink>
  );
});
