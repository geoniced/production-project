import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { ArticleDetails } from 'entities/Article';
import { useParams } from 'react-router-dom';
import cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
  className?: string;
}

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
  const {
    className,
  } = props;
  const { id } = useParams<{id: string}>();

  const { t } = useTranslation('article-details');

  if (!id) {
    return (
      <div className={classNames(cls.articleDetailsPage, {}, [className])}>
        {t('The article was not found')}
      </div>
    );
  }

  return (
    <div className={classNames(cls.articleDetailsPage, {}, [className])}>
      <ArticleDetails id={id} />
    </div>
  );
};

export default memo(ArticleDetailsPage);
